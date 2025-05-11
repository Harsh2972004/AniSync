import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  getUserProfile,
} from "../../controllers/userController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
