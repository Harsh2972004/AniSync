import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const BlacklistedToken = mongoose.model(
  "BlacklistedToken",
  blacklistSchema
);
