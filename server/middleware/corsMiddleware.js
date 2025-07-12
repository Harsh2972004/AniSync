import cors from "cors";
const corsMiddleware = cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});
export default corsMiddleware;
