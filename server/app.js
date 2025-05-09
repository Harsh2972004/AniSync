import express from "express";
import session from "express-session";
import connectDB from "./config/db.js";
import router from "./routes/api/user.js";
import animeRouter from "./routes/api/anime.js";
import passport from "./config/passport.js";
import dotenv from "dotenv";

dotenv.config();

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
app.use("/api/anime", animeRouter);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
