import { priorities } from "../models/priority.js";

export const getAllPriorities = (req, res) => {
  res.status(200).json(priorities);
};
