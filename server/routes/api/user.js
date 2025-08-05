import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendOtp,
} from "../../controllers/userController.js";
import {
  otpLimiter,
  resendLimiter,
} from "../../middleware/rateLimitMiddleware.js";
import cooldownMiddleware from "../../middleware/cooldownMiddleware.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-email", otpLimiter, verifyEmail);
router.post("/resend-otp", cooldownMiddleware, resendLimiter, resendOtp);
router.post(
  "/forgot-password",
  cooldownMiddleware,
  resendLimiter,
  requestPasswordReset
);
router.post("/reset-password", otpLimiter, resetPassword);
// router.get("/profile", isAuthenticated, getUserProfile);
router.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/anisync",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

// AniList authentication routes
router.get("/auth/anilist", passport.authenticate("anilist"));

router.get(
  "/auth/anilist/anisync",
  passport.authenticate("anilist", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

export default router;
