import { tasks } from "../models/task.js";
import { priorities } from "../models/priority.js";
import { notifications } from "../models/notification.js";
import { statuses } from "../models/status.js";
import dayjs from "dayjs";
import { wss } from "../server.js";
import WebSocket from 'ws'

export const addTask = (req, res) => {
  const { executor, title, description, status, priority, date, imageUrl } =
    req.body;

  const priorityValue = priorities.find((elem) => elem.name === priority);
  const statusValue = statuses.find((elem) => elem.name === status);
  const image = req.file ? req.file.path : imageUrl;

  const task = {
    id: tasks.length + 1,
    executor: JSON.parse(executor),
    title,
    description,
    priority: priorityValue,
    status: statusValue,
    date,
    image,
  };

  tasks.push(task);

  res.status(201).send(task);
  const notification = {
    type: "new_task",
    userId: task.executor.id,
    task,
    id: notifications.length + 1,
  };
  notifications.push(notification);

  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.userId === task.executor.id
    ) {
      client.send(JSON.stringify(notification));
    }
  });
};

export const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { executor, title, description, status, priority, date, imageUrl } =
    req.body;
  const image = req.file ? req.file.path : imageUrl;
  const priorityValue = priorities.find((elem) => elem.name === priority);
  const statusValue = statuses.find((elem) => elem.name === status);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send({ message: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    executor: JSON.parse(executor),
    title,
    description,
    priority: priorityValue,
    status: statusValue,
    date,
    image,
  };

  res.status(200).send(tasks);
};

export const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).send({ message: "Task deleted successfully" });
};

export const updateTaskStatus = (req, res) => {
  const taskId = parseInt(req.params.id);
  const status = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send({ message: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    status: status,
  };

  res.status(200).send({
    message: "Task status updated successfully",
    task: tasks[taskIndex],
  });
};

export const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).send({ message: "Task not found" });
  }

  res.status(200).json(task);
};

export const getAllTasks = (req, res) => {
  const { howtaskneed, filterTitle, filterDate } = req.query;
  const userId = req.user.id;
  function filterByParameters(taskList) {
    let filteredTask;
    function filterByDate(taskList) {
      if (filterDate) {
        const filteredDate = taskList.filter(
          (t) =>
            dayjs(filterDate[0]) <= dayjs(t.date) &&
            dayjs(t.date) <= dayjs(filterDate[1])
        );

        return filteredDate;
      } else {
        return taskList;
      }
    }

    if (filterTitle) {
      filteredTask = filterByDate(taskList).filter((t) =>
        t.title.includes(filterTitle)
      );
    } else {
      filteredTask = filterByDate(taskList);
    }
    return filteredTask;
  }

  let taskList;
  if (howtaskneed === "AllTasks") {
    taskList = filterByParameters(tasks);
  } else if (howtaskneed === "Vital") {
    taskList = filterByParameters(tasks).filter(
      (task) => task.executor.id === userId && task.status.name !== "Completed"
    );
  } else {
    taskList = filterByParameters(tasks).filter(
      (task) => task.executor.id === userId
    );
  }

  res.status(200).json(taskList);
};
