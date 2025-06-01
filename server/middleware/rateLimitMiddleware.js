import rateLimit from "express-rate-limit";

export const resendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    status: "error",
    message: "Too many requests, please try again later in 15 minutes.",
  },
});

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: "error",
    message:
      "Too many wrong OTP attempts, please try again later in 5 minutes.",
  },
});
