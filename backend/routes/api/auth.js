const express = require("express");
const {
  registrationController,
  loginController,
  linkController,
  otpController,
  resendMailController,
  forgetPasswordController,
  newPasswordController,
} = require("../../controllers/authController");
const router = express.Router();

router.post("/registration", registrationController);
router.post("/login", loginController);

router.post("/verification", linkController);
router.post("/otp", otpController);
router.post("/resendmail", resendMailController);
router.post("/forgotpassword", forgetPasswordController);
router.post("/newpassword", newPasswordController);

module.exports = router;
