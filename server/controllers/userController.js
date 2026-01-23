import { User } from "../models/userModel.js";
import { sendEmail } from "../config/email.js";
import passport from "passport";
import crypto from "crypto";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

export const sendVerificationEmail = async (user, req, res, next) => {
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    //store the OTP in the user document
    user.emailOTP = otp;
    user.emailOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
    await user.save();

    const subject = "Verify Your Email Address";
    const html = `
      <h1>Welcome to AniSync!</h1>
      <p>Your verification code is: <b>${otp}</b></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, subject, html);

    res.status(200).json({
      message: "Verification code sent",
    });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  const { email, purpose } = req.body;

  try {
    if (!email || !purpose) {
      const error = new Error("Email and purpose are required");
      error.statusCode = 400;
      return next(error);
    }
    const user = req.user;
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const now = Date.now();

    // Generate a new OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    let subject = "";
    let html = "";
    let customMessage = "";

    if (purpose === "verify") {
      if (user.isVerified) {
        const error = new Error("User already verified");
        error.statusCode = 400;
        return next(error);
      }

      user.emailOTP = otp;
      user.emailOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

      subject = "Verify Your Email Address";
      customMessage = "Your Verification code is:";

      user.lastEmailResend = now;
    } else if (purpose === "reset") {
      user.resestPassword = otp;
      user.resestPasswordExpires = Date.now() + 10 * 60 * 1000;

      subject = "Reset Your Password";
      customMessage = "Your Password reset code is:";
      user.lastResetResend = now;
    } else {
      const error = new Error("Invalid Purpose");
      error.statusCode = 400;
      return next(error);
    }

    await user.save();

    html = `
      <h1>Welcome to AniSync!</h1>
      <p>${customMessage} <b>${otp}</b></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, subject, html);

    res.status(200).json({
      message: "OTP resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400;
      return next(error);
    }

    if (user.isVerified) {
      const error = new Error("Email already verified");
      error.statusCode = 400;
      return next(error);
    }

    if (!otp) {
      const error = new Error("OTP is required, Check your Email.");
      error.statusCode = 400;
      return next(error);
    }

    if (
      !user.emailOTP ||
      user.emailOTP !== otp ||
      !user.emailOTPExpires ||
      user.emailOTPExpires < Date.now()
    ) {
      const error = new Error("Invalid or expired OTP");
      error.statusCode = 400;
      return next(error);
    }

    user.isVerified = true;
    user.emailOTP = null; // Clear OTP after verification
    user.emailOTPExpires = null; // Clear OTP expiration after verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.resestPassword = otp;
    user.resestPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const subject = "AniSync Password Reset Code";
    const html = `
      <h1>Password Reset</h1>
      <p>Your password reset code is: <b>${otp}</b></p>
      <p>This code will expire in 10 minutes.</p>
    `;
    await sendEmail(user.email, subject, html);
    res.status(200).json({ message: "Password reset code sent to your email" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ message: "Error requesting password reset" });
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resestPassword) {
      const error = new Error("User not found.");
      error.statusCode = 400;
      return next(error);
    }

    if (!otp || !newPassword || !confirmNewPassword) {
      const error = new Error("Entering fields are required");
      error.statusCode = 400;
      return next(error);
    }

    if (newPassword !== confirmNewPassword) {
      const error = new Error("confirm Password doesn't match");
      error.statusCode = 400;
      return next(error);
    }

    if (user.resestPassword !== otp) {
      const error = new Error("Invalid OTP.");
      error.statusCode = 400;
      return next(error);
    }

    if (
      !user.resestPasswordExpires ||
      user.resestPasswordExpires < Date.now()
    ) {
      const error = new Error("OTP has expired");
      error.statusCode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    // Clear the reset password fields
    user.resestPassword = null;
    user.resestPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await User.register(name, email, password, confirmPassword);
    await sendVerificationEmail(user, req, res, next);
  } catch (error) {
    if (error.errors) {
      // Mongoose validation errors will be handled by errorHandler
      return next(error);
    }
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, { session: true }, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      return res.json({ name: user.name, email: user.email });
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return res.status(500).json({ message: "Logout failed", error: err });
      }
      // Destroy session after logout
      req.session.destroy(() => {
        res.clearCookie("connect.sid"); // clear the session cookie (default name)
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      return next(error);
    }

    // if (!user.password)
    //   return res.status(400).json({ error: "no password set" });

    if (!newPassword || !confirmPassword) {
      const error = new Error("all fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // const isMatch = await User.comparePassword(currentPassword);
    // if (!isMatch) return res.status(400).json({ error: "incorrect password" });

    if (newPassword !== confirmPassword) {
      const error = new Error("passwords do not match");
      error.statusCode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({ message: "Welcome to your profile", user: req.user });
};

export const updateUserName = async (req, res, next) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    user.name = name;
    await user.save();

    res
      .status(200)
      .json({ message: "Username updated successfully", name: user.name });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileAvatatr = async (req, res) => {
  try {
    const id = req.user.id;

    // Fetch user to get old avatar
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Delete old avatar if it exists
    if (user.avatar) {
      const oldPath = path.join(process.cwd(), "uploads", user.avatar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // delete old file
      }
    }

    const normalizePath = req.file.path.replace(/\\/g, "/");
    const profileAvatar = normalizePath.split("/").pop();

    user.avatar = profileAvatar;
    await user.save();

    res.json({ message: "profile Updated", avatar: profileAvatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvatar = async (req, res, next) => {
  const { filename } = req.params;
  try {
    const filePath = path.join(process.cwd(), "uploads", filename);

    if (!fs.existsSync(filePath)) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

export const uploadBannerImage = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "user not found." });

    if (user.profileBanner) {
      const oldPath = path.join(process.cwd(), "uploads", user.profileBanner);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const normalizedPath = req.file.path.replace(/\\/g, "/");
    const profileBanner = normalizedPath.split("/").pop();

    user.profileBanner = profileBanner;
    await user.save();
    res.json({ message: "banner Updated", profileBanner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBannerImage = async (req, res, next) => {
  const { filename } = req.params;
  try {
    const filePath = path.join(process.cwd(), "uploads", filename);
    if (!fs.existsSync(filePath)) {
      const error = new Error("banner image not found");
      error.statusCode = 404;
      return next(error);
    }

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
