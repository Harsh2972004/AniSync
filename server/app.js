import express from "express";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import connectDB from "./config/db.js";
import router from "./routes/api/user.js";
import mediaRouter from "./routes/api/media.js";
import passport from "./config/passport.js";
import dotenv from "dotenv";

dotenv.config();

// Get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
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

// Connect to MongoDB
connectDB();

app.use("/", (req, res) => {
  res.send("Welcome to the Anime API Server!");
});

//redirecting all HTTP traffic to HTTPS
http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(8080);

//setup ssl server
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert/cert.pem")),
  },
  app
);

sslServer.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
