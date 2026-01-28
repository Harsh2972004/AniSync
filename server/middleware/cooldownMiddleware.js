import { User } from "../models/userModel.js";

const cooldownMiddleware = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;

    if (!email) {
      const err = new Error("Validation failed");
      err.statusCode = 400;
      err.errors = { email: "Email is required" };
      return next(err);
    }

    if (!purpose || !["verify", "reset"].includes(purpose)) {
      const err = new Error("Validation failed");
      err.statusCode = 400;
      err.errors = { general: "Invalid purpose" };
      return next(err);
    }

    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("Validation failed");
      err.statusCode = 404;
      err.errors = { general: "User not found" };
      return next(err);
    }

    const now = Date.now();

    const lastResend =
      purpose === "verify"
        ? user.lastEmailResend
        : user.lastResetResend;

    if (lastResend) {
      const elapsed = now - new Date(lastResend).getTime();
      const cooldown = 2 * 60 * 1000;

      if (elapsed < cooldown) {
        const remaining = Math.ceil((cooldown - elapsed) / 1000);

        const err = new Error("Cooldown active");
        err.statusCode = 429;
        err.errors = {
          general: `Please wait ${remaining} seconds before retrying.`,
        };
        err.retryAfter = remaining;
        return next(err);
      }
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default cooldownMiddleware;
