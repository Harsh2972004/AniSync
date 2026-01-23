import express from "express";
// import fs from "fs";
// import path from "path";
// import https from "https";
import http from "http";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
import session from "express-session";
import connectDB from "./config/db.js";
import router from "./routes/api/user.js";
import mediaRouter from "./routes/api/media.js";
import filterRouter from "./routes/api/filtersEnum.js";
import listRouter from "./routes/api/list.js";
import passport from "./config/passport.js";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/corsMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

// // Get the current directory name and file name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for CORS
app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//routes module
app.use("/api/user", router);
app.use("/api/anime", mediaRouter);
app.use("/api/filters", filterRouter);
app.use("/api/list", listRouter);

// Connect to MongoDB
connectDB();

app.use("/", (req, res) => {
  res.send("Welcome to the Anime API Server!");
});

// Error handler middleware - MUST be after all routes
app.use(errorHandler);

// //redirecting all HTTP traffic to HTTPS
// http
//   .createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
//   })
//   .listen(8080);

// //setup ssl server
// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "cert/key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "cert/cert.pem")),
//   },
//   app
// );

// sslServer.listen(PORT, () => {
//   console.log(`Server is running on https://localhost:${PORT}`);
// });

// app.listen(PORT, "0.0.0.0", () => {
//   if (process.env.NODE_ENV !== "production") {
//     console.log(`Server is running on port ${PORT}`);
//   }
// });

export default app
