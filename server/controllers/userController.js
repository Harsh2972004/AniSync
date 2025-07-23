import jwt from "jsonwebtoken";
import { BlacklistedToken } from "../models/blacklistModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../config/email.js";
import passport from "passport";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const sendVerificationEmail = async (user, req, res) => {
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

    console.log(`Verification code sent to ${user.email}`);
    res.status(200).json({
      message: "Verification code sent",
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ message: "Error sending verification code" });
  }
};

export const resendOtp = async (req, res) => {
  const { email, purpose } = req.body;

  try {
    if (!email || !purpose) {
      return res
        .status(400)
        .json({ message: "Email and purpose are required" });
    }
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = Date.now();

    // Generate a new OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    let subject = "";
    let html = "";
    let customMessage = "";

    if (purpose === "verify") {
      if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
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
      return res.status(400).json({ message: "Invalid Purpose" });
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
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Error resending OTP" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    if (
      !user.emailOTP ||
      user.emailOTP !== otp ||
      !user.emailOTPExpires ||
      user.emailOTPExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.emailOTP = null; // Clear OTP after verification
    user.emailOTPExpires = null; // Clear OTP expiration after verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Error verifying email" });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
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

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resestPassword) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.resestPassword !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (
      !user.resestPasswordExpires ||
      user.resestPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "OTP has expired" });
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
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.register(name, email, password);
    await sendVerificationEmail(user, req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ name: user.name, email: user.email, token });
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const blacklistedToken = new BlacklistedToken({
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
    });
    blacklistedToken.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({ message: "Welcome to your profile", user: req.user });
};
