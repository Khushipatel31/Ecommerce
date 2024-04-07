const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const { CustomHttpError } = require("../utils/CustomError");
const { errorHandler } = require("./errorHandling");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new CustomHttpError(401, "Please login to access resources"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  //if req.user.id then output is 65b65c2610ec34e544e7c796
  //if req._id output is new ObjectId('65b65c2610ec34e544e7c796')
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //in middleware we cannot pass function so we have written middleware function inside function
    //roles=admin we have passed in products routes so if req.user.role does not include admin then error
    if (!roles.includes(req.user.role)) {
      return next(new CustomHttpError(403, `${req.user.role} is not authorized to perform this action`));
    }
    next();
  };
};
