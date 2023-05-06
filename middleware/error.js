const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  //Wrong mongoDb Id error
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  //mongoose duplicate kry error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
  }

  //Wrong JWT error
  if (error.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    error = new ErrorHandler(message, 400);
  }
  //Wrong JWT error
  if (error.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
