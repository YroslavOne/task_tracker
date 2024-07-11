import express from "express";
import { getAllPriorities } from "../controllers/priorityController.js";

const router = express.Router();

router.get("/", getAllPriorities);

export default router;
