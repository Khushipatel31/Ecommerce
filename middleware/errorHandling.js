// src/middlewares/errorHandling.js

const { CustomHttpError } = require("../utils/CustomError");


function errorHandler(err, req, res, next) {

  err.httpStatusCode=err.httpStatusCode||500;
  err.message=err.message||"Internal error";


  //wrong mongodb id error
  if(err.name=="CastError"){
    const message=`Resource not found. Invalid: ${err.path} `;
    err=new CustomHttpError(400,message);
  }
  //mongoose duplicate key //when same email registers
  if(err.code==11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} error `;
    err=new CustomHttpError(400,message);
  }
  //wrong token error
  if(err.name=="JsonWebTokenError"){
    const message=`JSON web token is invalid try again `;
    err=new CustomHttpError(401,message);
  }

  //jwt expire 
  if(err.name=="TokenExpiredError"){
    const message=`JSON web token is expired please login again `;
    err=new CustomHttpError(401,message);
  }

 
  res.status(err.httpStatusCode).json({
    success:false,
    message:err.message,
    error:err,//if we write err.stack we can get to know location from where error occured
  })
}

module.exports = {
  errorHandler,
};