import jwt from "jsonwebtoken";
import { BlacklistedToken } from "../models/blacklistModel.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  //check if token is blacklisted
  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
