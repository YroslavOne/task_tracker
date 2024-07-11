import express from "express";
import {storage} from '../storage.js'
import {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskById,
  getAllTasks,
} from "../controllers/taskController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/", authenticateToken, upload.single("image"), addTask);
router.put("/:id", authenticateToken, upload.single("image"), updateTask);
router.delete("/:id", authenticateToken, deleteTask);
router.put("/status-edit/:id", authenticateToken, updateTaskStatus);
router.get("/:id", authenticateToken, getTaskById);
router.get("/", authenticateToken, getAllTasks);

export default router;
