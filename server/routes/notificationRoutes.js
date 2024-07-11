import express from "express";
import {
  getNotifications,
  deleteNotification,
} from "../controllers/notificationController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.delete("/:id", authenticateToken, deleteNotification);

export default router;
