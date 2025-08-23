import cors from "cors";
const corsMiddleware = cors({
  origin: ["http://localhost:5173", "http://192.168.1.21:5173"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});
export default corsMiddleware;
