import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendOtp,
  uploadProfileAvatatr,
  getAvatar,
  uploadBannerImage,
  getBannerImage,
  updateUserName,
  updateUserPassword,
} from "../../controllers/userController.js";
import {
  otpLimiter,
  resendLimiter,
} from "../../middleware/rateLimitMiddleware.js";
import cooldownMiddleware from "../../middleware/cooldownMiddleware.js";
import passport from "passport";
import upload from "../../middleware/multerMiddlerware.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-email", otpLimiter, verifyEmail);
router.post("/resend-otp", cooldownMiddleware, resendLimiter, resendOtp);
router.post(
  "/forgot-password",
  cooldownMiddleware,
  resendLimiter,
  requestPasswordReset
);
router.post("/reset-password", otpLimiter, resetPassword);

router.put("/update-password", isAuthenticated, updateUserPassword);

// router.get("/profile", isAuthenticated, getUserProfile);

router.get("/auth/status", (req, res, next) => {
  console.log("cookie token exists?", !!req.cookies?.token);
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("jwt err:", err);
    console.log("jwt info:", info);
    console.log("jwt user:", user?._id);

    if (err) return next(err);
    if (!user) return res.json({ isAuthenticated: false });
    return res.json({ isAuthenticated: true, user });
  })(req, res, next);
});


router.put("/update-username", isAuthenticated, updateUserName);

router.post(
  "/profile-avatar",
  isAuthenticated,
  upload.single("profileAvatar"),
  uploadProfileAvatatr
);

router.post(
  "/banner-image",
  isAuthenticated,
  upload.single("profileBanner"),
  uploadBannerImage
);

router.get("/getAvatar/:filename", isAuthenticated, getAvatar);

router.get("/get-banner-image/:filename", isAuthenticated, getBannerImage);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/auth/google/anisync",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(process.env.CLIENT_URL || "/");
  }
);

// AniList authentication routes
router.get("/auth/anilist", passport.authenticate("anilist", {session:false}),);

router.get(
  "/auth/anilist/anisync",
  passport.authenticate("anilist", {
    failureRedirect: "/login",
    session:false
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(process.env.CLIENT_URL || "/");
  }
);

export default router;
