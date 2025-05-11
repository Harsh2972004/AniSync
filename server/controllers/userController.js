import jwt from "jsonwebtoken";
import { BlacklistedToken } from "../models/blacklistModel.js";
import { User } from "../models/userModel.js";
import passport from "passport";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.register(name, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", name, email });
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
