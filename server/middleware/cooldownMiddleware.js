import { User } from "../models/userModel.js";

const cooldownMiddleware = async (req, res, next) => {
  const { email, purpose } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const now = Date.now();

  const lastEmailOtpResend = user.lastEmailResend
    ? new Date(user.lastEmailResend).getTime()
    : null;
  const lastResetOtpResend = user.lastResetResend
    ? new Date(user.lastResetResend).getTime()
    : null;

  if (purpose === "verify") {
    if (lastEmailOtpResend && now - lastEmailOtpResend < 2 * 60 * 1000) {
      const remainingTime = Math.ceil(
        (2 * 60 * 1000 - (now - lastEmailOtpResend)) / 1000
      );
      return res.status(429).json({
        status: "error",
        message: `You can only resend the verification code every 2 minutes. Please wait ${remainingTime} seconds.`,
        retryAfter: remainingTime,
      });
    }
  } else if (purpose === "reset") {
    if (lastResetOtpResend && now - lastResetOtpResend < 2 * 60 * 1000) {
      const remainingTime = Math.ceil(
        (2 * 60 * 1000 - (now - lastResetOtpResend)) / 1000
      );
      return res.status(429).json({
        status: "error",
        message: `You can only resend the verification code every 2 minutes. Please wait ${remainingTime} seconds.`,
        retryAfter: remainingTime,
      });
    }
  }

  req.user = user; // Attach user to request for further processing

  next();
};

export default cooldownMiddleware;
