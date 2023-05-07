const express = require("express");
const {
  register,
  activateAccount,
  login,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
