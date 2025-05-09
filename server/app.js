import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/api/user.js";
import animeRouter from "./routes/api/anime.js";
import passport from "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

//routes module
app.use("/api/user", router);
app.use("/api/anime", animeRouter);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
