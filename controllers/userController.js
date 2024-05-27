const { CustomHttpError } = require("../utils/CustomError");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.profileImage, {
    folder: "profileImages",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profile: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  // below 4 lines are getting repeated in loginalso so will create one util for the same
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomHttpError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomHttpError(401, "Invalid Credentials"));
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return next(new CustomHttpError(401, "Invalid Credentials"));
  }
  sendToken(user, 200, res);
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new CustomHttpError(404, "No User exists"));
  }
  //get reset password token
  const resetToken = user.getresetPasswordToken();
  await user.save({ validateBeforeSave: false }); //saving token and expiry of token to database
  const resetPasswordUrl =
    req.protocol + "://" + "localhost:3000" + "/password/reset/" + resetToken;
  const message = `Your password reset token is : \n\n ${resetPasswordUrl}\n\n If you did not request for forgot password please ignore this mail`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false }); //if error are there then we must remove above two field and save to database
    return next(new CustomHttpError(500, error.message));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //firstly we will get the token and convert into hash to check as we have stored hashed token in database while forgot password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new CustomHttpError(
        400,
        "Reset password token is invalid or has been expired"
      )
    );
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new CustomHttpError(400, "Password does not match"));
  }
  user.password = req.body.newPassword;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//getting user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
//get single user (admin)
exports.getAllDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomHttpError(404, "No User exists"));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//get all user (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new CustomHttpError(400, "Old Password is incorrect"));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new CustomHttpError(400, "Password does not match"));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);

  res.status(200).json({
    success: true,
    user,
  });
});

//update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.profileImage !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.profile[0].public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.profileImage, {
      folder: "profileImages",
      width: 150,
      crop: "scale",
    });
    newUserData.profile = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//logout
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//admin tasks
exports.adminUpdateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomHttpError(404, "No User exists"));
  }
  const imageId = user.profile[0].public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});
