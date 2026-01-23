import cors from "cors";

// Define allowed origins based on environment
// Filter out undefined/null values and trim whitespace
const allowedOrigins = [
  process.env.CLIENT_URL?.trim(), // Your frontend URL from .env
  "http://localhost:5173", // Vite default dev server
  "http://localhost:3000", // Alternative dev port
].filter(Boolean); // Remove any undefined/null/empty strings

// Create CORS middleware with origin validation
const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    // This is useful for server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Normalize origin: remove trailing slash for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");

    // Check if the origin (or normalized version) is in the allowed list
    const isAllowed = allowedOrigins.some((allowed) => {
      const normalizedAllowed = allowed?.replace(/\/$/, "");
      return normalizedOrigin === normalizedAllowed;
    });

    if (isAllowed) {
      callback(null, true); // Allow this origin
    } else {
      // In development, be more permissive (allow all)
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
      } else {
        // Log for debugging (only in development)
        if (process.env.NODE_ENV !== "production") {
          console.log("CORS blocked origin:", origin);
          console.log("Allowed origins:", allowedOrigins);
        }
        // In production, reject unknown origins
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, 
});

export default corsMiddleware;
