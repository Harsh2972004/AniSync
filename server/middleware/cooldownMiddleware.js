import { User } from "../models/userModel.js";

const cooldownMiddleware = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const now = Date.now();
  const lastResend = user.lastResend
    ? new Date(user.lastResend).getTime()
    : null;

  if (lastResend && now - lastResend < 2 * 60 * 1000) {
    const remainingTime = Math.ceil(
      (2 * 60 * 1000 - (now - lastResend)) / 1000
    );
    return res.status(429).json({
      status: "error",
      message: `You can only resend the verification code every 2 minutes. Please wait ${remainingTime} seconds.`,
      retryAfter: remainingTime,
    });
  }

  req.user = user; // Attach user to request for further processing

  next();
};

export default cooldownMiddleware;
