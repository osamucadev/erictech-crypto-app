import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";
import upload from "../config/multer";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/update", protect, upload.single("profileImage"), updateUser);

export default router;
