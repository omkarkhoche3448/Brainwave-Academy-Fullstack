const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authZ");

const {
  login,
  signUp,
  changePassword,
  sendOtp,
} = require("../Controller/Auth");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/changepassword", auth, changePassword);
router.post("/sendotp", sendOtp);

const { resetPasswordToken, resetPassword } = require('../Controller/resetPassword');
router.post('/reset-password-token', resetPasswordToken)
router.post('/reset-password', resetPassword);

module.exports = router;
