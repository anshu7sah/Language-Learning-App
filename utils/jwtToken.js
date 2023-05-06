const { generateToken } = require("../helper/token");

const sendToken = (user, statusCode, res, message) => {
  const token = generateToken({ id: user._id }, process.env.JWT_EXPIRES_IN);

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message,
  });
};

module.exports = sendToken;
