import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendVerificationEmail,
} from "../../controllers/userController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { resendLimiter } from "../../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerificationEmail);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
