import express from "express";
import {
  getStatusCount,
  getAllStatuses,
} from "../controllers/statusController.js";

const router = express.Router();

router.get("/count", getStatusCount);
router.get("/", getAllStatuses);

export default router;
