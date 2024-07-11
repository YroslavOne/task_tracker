import { tasks } from "../models/task.js";
import { statuses } from "../models/status.js";

export const getStatusCount = (req, res) => {
  statuses.forEach((status) => {
    status.valueCounted = 0;
  });

  statuses.forEach((status) => {
    tasks.forEach((task) => {
      if (task.status.name === status.name) {
        status.valueCounted++;
      }
    });
  });

  res.status(200).json(statuses);
};

export const getAllStatuses = (req, res) => {
  res.status(200).json(statuses);
};
