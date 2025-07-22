import rateLimit from "express-rate-limit";

export const resendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  keyGenerator: (req, res) => {
    // Use the email from the request body as the key for rate limiting
    return req.body.email || req.ip; // Fallback to IP if email is not provided
  },
  handler: (req, res) => {
    console.log("resendLimiter hit for:", req.body.email || req.ip);
    res.status(429).json({
      status: "error",
      message: "Too many requests, please try again later.",
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  keyGenerator: (req, res) => {
    // Use the email from the request body as the key for rate limiting
    return req.body.email || req.ip; // Fallback to IP if email is not provided
  },
  handler: (req, res) => {
    console.log("resendLimiter hit for:", req.body.email || req.ip);
    res.status(429).json({
      status: "error",
      message: "Too many requests, please try again later.",
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
