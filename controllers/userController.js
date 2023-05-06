const { sendVerificationEmail } = require("../helper/mailer");
const { generateToken } = require("../helper/token");
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validateUsername,
  validateLength,
} = require("../helper/validate");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
    const check = await User.findOne({
      email,
    });
    if (check) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      gender,
      bYear,
      bMonth,
      bDay,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.Base_Url}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const message = "Register successfully! Please activate your account ";
    sendToken(user, 201, res, message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    if (user.verified) {
      res.status(400).json({
        message: "This account is already activated",
      });
    } else {
      await User.findByIdAndUpdate(user.id, {
        verified: true,
      });
      return res.status(200).json({
        message: "Your account has been activated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "the email address you entered is not connected to an account",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
      });
    }
    const message = "Login Successfully";
    sendToken(user, 200, res, message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  activateAccount,
  login,
};
