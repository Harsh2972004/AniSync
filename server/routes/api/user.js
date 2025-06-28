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
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-email", otpLimiter, verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerificationEmail);
router.post("/forgot-password", resendLimiter, requestPasswordReset);
router.post("/reset-password", otpLimiter, resetPassword);
router.get("/profile", isAuthenticated, getUserProfile);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/anisync",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Successful authentication, redirect home or send user data.
    res.redirect("/profile");
  }
);

router.get(
  "/auth/anilist",
  passport.authenticate("anilist", { session: false })
);

router.get(
  "/auth/anilist/anisync",
  passport.authenticate("anilist", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Successful authentication
    res.json({ message: "AniList login successful", user: req.user });
  }
);
export default router;
