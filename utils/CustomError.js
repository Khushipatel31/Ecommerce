// src/errors/CustomError.js

class CustomError extends Error {
  httpStatusCode;
  timestamp;
  documentationUrl;
  message;

 

  constructor(httpStatusCode, message, documentationUrl) {
    super(message);
    // initializing the class properties
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();
    this.message = message;
    this.documentationUrl = documentationUrl;
    // attaching a call stack to the current class,
    // preventing the constructor call to appear in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  CustomHttpError: CustomError,
};
