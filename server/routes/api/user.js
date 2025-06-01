import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendVerificationEmail,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/userController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import {
  otpLimiter,
  resendLimiter,
} from "../../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-email", otpLimiter, verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerificationEmail);
router.post("/forgot-password", resendLimiter, requestPasswordReset);
router.post("/reset-password", otpLimiter, resetPassword);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
