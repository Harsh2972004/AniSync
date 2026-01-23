import cors from "cors";

// Define allowed origins based on environment
const allowedOrigins = [
  process.env.CLIENT_URL, // Your frontend URL from .env
  "http://localhost:5173", // Vite default dev server
  "http://localhost:3000", // Alternative dev port
];

// Create CORS middleware with origin validation
const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    // This is useful for server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow this origin
    } else {
      // In development, be more permissive (allow all)
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
      } else {
        // In production, reject unknown origins
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, 
});

export default corsMiddleware;
