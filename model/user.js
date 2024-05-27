const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const jwt=require("jsonwebtoken");
const crypto=require("crypto")
const bcrypt=require("bcryptjs");//for encryption of password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your First Name"],
    maxLength: [30, "Name cannot exceed 30 character"],
    minLength: [4, "Name must have more than 4 character"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your Email"],
    validate: [validator.isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minLength: [8, "Password must be greater than 8 characters"],
    select: false, //whenever find method is called
  },
  profile: [
    //will use cloudmary jema public id and url madse
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: String,
  },
});

//have apre this use karvu padse because model is our reference but we can not use this in call back function so will use async function
userSchema.pre("save",async function(next){

    //password not modified then will go to next step
    //when update name and email
    if(!this.isModified("password")){
        next();
    }
    //when user wants to update password then
    this.password=await bcrypt.hash(this.password,10);//10 characters password
})

  
//JWT generation and storing in cookie
userSchema.methods.getJWTToken =  function() {
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  });
};

//we use async await for using bcrypt
//enteredPassword=plainText and this.password=encrypted
userSchema.methods.comparePassword= async function(enteredPassword) {
  return   await  bcrypt.compare(enteredPassword,this.password);
};


//for creating new token for forgot password
userSchema.methods.getresetPasswordToken=  function() {
    const token=crypto.randomBytes(20).toString("hex");//new token using crypto 
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest("hex");//using sha256 algorithm and updating hash by token
    this.resetPasswordExpire=Date.now()+60*60*1000;//setting expiry after 15 minutes
    //by using this. the extra properties are added but not saved to database so look at user Controller
    return token;
};




module.exports = mongoose.model("user", userSchema);
