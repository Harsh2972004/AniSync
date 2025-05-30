import jwt from "jsonwebtoken";
import { BlacklistedToken } from "../models/blacklistModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../config/email.js";
import passport from "passport";

export const sendVerificationEmail = async (user, req, res) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Store the token in the database
    user.verificationToken = token;
    await user.save();

    const protocol =
      process.env.NODE_ENV === "production" ? "https" : req.protocol;
    const verificationUrl = `${protocol}://${req.get(
      "host"
    )}/api/user/verify-email/${token}`;

    const subject = "Verify Your Email Address";
    const html = `
      <h1>Welcome to AniSync!</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail(user.email, subject, html);

    console.log(
      `Verification email sent to ${user.email} with link: ${verificationUrl}`
    );
    res.status(200).json({
      message: "Verification email sent",
      verificationUrl,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ message: "Error sending verification email" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    user.isVerified = true;
    user.verificationToken = null; // Clear the verification token after successful verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Error verifying email" });
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
      return res.json({ user, token });
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
