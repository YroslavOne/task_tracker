import express from "express";
import { storage } from "../storage.js";
import {
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  updatePassword,
} from "../controllers/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: storage });

router.get("/profile", authenticateToken, getUserProfile);
router.get("/profile/all", authenticateToken, getAllUsers);
router.put(
  "/profile/edit",
  authenticateToken,
  upload.single("image"),
  updateUserProfile
);
router.put(
  "/profile/edit-password",
  authenticateToken,
  upload.single("image"),
  updatePassword
);

export default router;
