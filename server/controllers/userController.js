import { User } from "../models/userModel.js";
import { sendEmail } from "../config/email.js";
import passport from "passport";
import crypto from "crypto";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken"
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const cookieOptions = {
  httpOnly: true,
  secure: true,      // Vercel is HTTPS
  sameSite: "none",  // because frontend & backend are different Vercel domains
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const sendTokenCookie = (user, res) => {
  const token = signToken(user._id);
  res.cookie("token", token, cookieOptions);
};


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
    const user = await User.findOne({ email })
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
    next(error);
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
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info.message });
    }

    sendTokenCookie(user, res)

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl,
        profileBanner: user.profileBannerUrl,
      }
    });

  })(req, res, next);
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
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

export const uploadProfileAvatatr = async (req, res, next) => {
  try {
    const id = req.user.id;

    if (!req.file?.buffer) {
      const err = new Error("no image uploaded")
      err.statusCode = 400
      return next(err)
    }

    const user = await User.findById(id)
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    // delete old avatar from cloudinary
    await deleteFromCloudinary(user.avatarPublicId);

    // upload new
    const result = await uploadBufferToCloudinary({
      buffer: req.file.buffer,
      folder: "anisync/avatars",
      publicId: `user_${id}_avatar`,
    });

    user.avatarUrl = result.secure_url;
    user.avatarPublicId = result.public_id;
    await user.save();

    res.json({ message: "Avatar updated", avatarUrl: user.avatarUrl });

  } catch (error) {
    next(error)
  }
};

export const uploadBannerImage = async (req, res, next) => {
  try {
    const id = req.user.id;

    if (!req.file?.buffer) {
      const err = new Error("No image uploaded");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findById(id);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    await deleteFromCloudinary(user.profileBannerPublicId);

    const result = await uploadBufferToCloudinary({
      buffer: req.file.buffer,
      folder: "anisync/banners",
      publicId: `user_${id}_banner`,
    });

    user.profileBannerUrl = result.secure_url;
    user.profileBannerPublicId = result.public_id;
    await user.save();

    res.json({ message: "Banner updated", bannerUrl: user.profileBannerUrl });

  } catch (error) {
    next(error)
  }
};

export const updateUserFavouritesOrder = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { favourites } = req.body

    if (!Array.isArray(favourites)) {
      const err = new Error("Favourites must be an array")
      err.statusCode = 400
      return next(err)
    }
    // validate all are numbers
    if (!favourites.every((id) => Number.isFinite(Number(id)))) {
      const err = new Error("Invalid favourites ids");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { favourites: favourites.map(Number) },
      { new: true }
    )

    res.status(200).json({ message: "Favourites order saved", favourites: user.favourites });

  } catch (error) {
    next(error)
  }
}