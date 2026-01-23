/**
 * ERROR HANDLING MIDDLEWARE
 * 
 * ============================================
 * WHAT IS MIDDLEWARE?
 * ============================================
 * 
 * Middleware in Express.js is like a "checkpoint" or "filter" that runs between
 * receiving a request and sending a response. Think of it like a security guard
 * at a building entrance - they check everyone before they enter.
 * 
 * Middleware functions have access to:
 * - req (request object) - contains data about the incoming request
 * - res (response object) - used to send responses
 * - next - a function to pass control to the next middleware
 * 
 * ============================================
 * HOW MIDDLEWARE WORKS
 * ============================================
 * 
 * 1. Request comes in → Express starts processing
 * 2. Middleware 1 runs → Does something, calls next()
 * 3. Middleware 2 runs → Does something, calls next()
 * 4. Route handler runs → Processes the request
 * 5. Response sent back
 * 
 * If any middleware calls next(error), Express skips to error handlers.
 * 
 * ============================================
 * ERROR HANDLING MIDDLEWARE
 * ============================================
 * 
 * Error handling middleware is SPECIAL - it has 4 parameters instead of 3:
 * (err, req, res, next)
 * 
 * Express automatically calls error handlers when:
 * - next(error) is called anywhere
 * - An unhandled exception occurs
 * - An async function throws an error
 * 
 * IMPORTANT: Error handlers MUST be defined AFTER all routes!
 * 
 * ============================================
 * THIS MIDDLEWARE EXPLAINED
 * ============================================
 */

/**
 * Global Error Handler Middleware
 * 
 * This catches ALL errors that occur in your application and handles them
 * in a consistent, secure way.
 * 
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Get the error message
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging (in development)
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // ============================================
  // HANDLE SPECIFIC ERROR TYPES
  // ============================================

  // Mongoose Bad ObjectId (invalid MongoDB ID format)
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { message, statusCode: 404 };
  }

  // Mongoose Duplicate Key (trying to create duplicate unique field)
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  // Mongoose Validation Error (required fields missing, invalid data)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = { message, statusCode: 400 };
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = { message, statusCode: 401 };
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = { message, statusCode: 401 };
  }

  // ============================================
  // SEND RESPONSE
  // ============================================

  // Default to 500 (Internal Server Error) if no status code
  const statusCode = error.statusCode || 500;

  // In production, don't expose error details
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal Server Error"
      : error.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;

/**
 * ============================================
 * HOW TO USE THIS MIDDLEWARE
 * ============================================
 * 
 * In your app.js file, add this AFTER all your routes:
 * 
 * import errorHandler from "./middleware/errorHandler.js";
 * 
 * // ... all your routes ...
 * 
 * // Error handler must be last!
 * app.use(errorHandler);
 * 
 * ============================================
 * HOW TO TRIGGER ERRORS IN YOUR CODE
 * ============================================
 * 
 * 1. In async route handlers, use try/catch:
 * 
 *    router.get("/users/:id", async (req, res, next) => {
 *      try {
 *        const user = await User.findById(req.params.id);
 *        if (!user) {
 *          return next(new Error("User not found")); // Pass to error handler
 *        }
 *        res.json(user);
 *      } catch (error) {
 *        next(error); // Pass error to error handler
 *      }
 *    });
 * 
 * 2. Or use Express async handler wrapper:
 * 
 *    const asyncHandler = (fn) => (req, res, next) => {
 *      Promise.resolve(fn(req, res, next)).catch(next);
 *    };
 * 
 *    router.get("/users/:id", asyncHandler(async (req, res) => {
 *      const user = await User.findById(req.params.id);
 *      if (!user) throw new Error("User not found");
 *      res.json(user);
 *    }));
 * 
 * ============================================
 * WHY THIS IS IMPORTANT
 * ============================================
 * 
 * 1. Security: Don't expose sensitive error details in production
 * 2. Consistency: All errors return the same format
 * 3. User Experience: Users get friendly error messages
 * 4. Debugging: Developers get detailed errors in development
 * 5. Prevents Crashes: Unhandled errors won't crash your server
 * 
 */
