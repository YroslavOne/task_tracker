import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { colors } from "@mui/material";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "your_secret_key";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// Пример базы данных в оперативной памяти
let users = [
  {
    firstName: "Ярослав",
    lastName: "Берилло",
    userName: "yaroslav",
    email: "1",
    password: "1",
    phone: "88005553535",
    token: "hi",
    id: 0,
    image:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
];
let statuses = [
  {
    name: "Not Started",
    color: "#F21E1E",
  },
  {
    name: "In Progress",
    color: "#0225FF",
  },
  {
    name: "Completed",
    color: "#05A301",
  },
];
let priorities = [
  {
    name: "Extreme",
    color: "#F21E1E",
  },
  {
    name: "Moderate",
    color: "#3ABEFF",
  },
  {
    name: "Low",
    color: "#05A301",
  },
];
let tasks = [
  {
    id: 0,
    executor: {
      userName: users[0].userName,
      email: users[0].email,
      id: users[0].id,
    },

    title: "Attend Nischal’s Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
    priority: {
      name: priorities[0].name,
      color: priorities[0].color,
    },
    status: {
      name: statuses[0].name,
      color: statuses[0].color,
    },
    date: "12.05.2024",
    image:
      "https://img.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.webp",
  },
];

// Регистрация пользователя
app.post("/register", (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const id = users.length + 1;
  const token = jwt.sign({ id: id, email: email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  const emailFind = users.find(u=> u.email===email)

  if (emailFind){
    res.status(401).send({ message: "User with this email already exists!" });
  }
  const user = {
    firstName,
    lastName,
    userName,
    email,
    password,
    token,
    id,
  };
  users.push(user);
  res.status(201).send({ message: "Login successful", token });
});

// Аутентификация пользователя
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).send({ message: "Invalid email or password" });
  } else {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    user.token = token;
    res.status(200).json({ message: "Login successful", token });
  }
});

// Middleware для проверки и декодирования JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Если токена нет, возвращаем 401

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Если токен недействителен, возвращаем 403
    req.user = user;
    next(); // Переходим к следующему обработчику
  });
};

// Маршрут для получения профиля пользователя
app.get("/login/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    image: user.image,
    id: user.id,
  });
});

app.get("/login/profile/all", authenticateToken, (req, res) => {
  const user = [];
  users.map((u, index) => {
    user.push({
      username: u.userName,
      email: u.email,
      id: index,
    });
  });
  res.status(200).json(user);
});

//Обновление профиля

app.put(
  "/login/profile/edit",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, userName, email, phone, imageUrl } = req.body;

    const userIndex = users.findIndex((u) => u.id === userId);

    const image = req.file ? req.file.path : imageUrl;

    if (userIndex === -1) {
      return res.status(404).send({ message: "User not found" });
    }

    users[userIndex] = {
      ...users[userIndex],
      firstName,
      lastName,
      userName,
      email,
      phone,
      image: image,
    };

    res.status(200).send(users[userIndex]);
  }
);

// Обновление пароля

app.put(
  "/login/profile/edit-password",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    const userId = req.user.id;
    const { password, newPassword } = req.body;

    const userIndex = users.findIndex((u) => u.id === userId);
    const userSearch = users.filter((u)=>u.id === userId)

    if (userIndex === -1) {
      return res.status(404).send({ message: "User not found" });
    }
    if (userSearch[0].password !== password) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    users[userIndex] = {
      ...users[userIndex],
      password: newPassword,
    };

    res.status(200).send(users[userIndex]);
  }
);
// Добавление задачи
app.post("/tasks", authenticateToken, upload.single("image"), (req, res) => {
  const { executor, title, description, priority, status, date } = req.body;
  const image = req.file ? req.file.path : null;
  const id = tasks.length + 1;
  const priorityValue = priorities.find((elem) => elem.name === priority);
  const statusValue = statuses.find((elem) => elem.name === status);
  const task = {
    id,
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
});

// Обновление задачи
app.put("/tasks/:id", authenticateToken, upload.single("image"), (req, res) => {
  const { id } = req.params;

  const { executor, title, description, priority, status, date, imageUrl } =
    req.body;
  const priorityValue = priorities.find((elem) => elem.name === priority);
  const statusValue = statuses.find((elem) => elem.name === status);
  const image = req.file ? req.file.path : imageUrl;
  console.log(title);
  const taskIndex = tasks.findIndex((task) => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    executor: JSON.parse(executor), // Parse string to JSON if executor is sent as a string
    title,
    description,
    priority: priorityValue,
    status: statusValue,
    date,
    image: image,
  };

  res.status(200).send(tasks);
});

// Delete задачи по id

app.delete("/tasks/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }

  tasks.splice(taskIndex, 1);
  res.status(200).send({ message: "Task deleted successfully" });
});

// завершение задачи
app.put(
  "/tasks/complet/:id",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    const status = req.body;
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id == id);
    if (taskIndex === -1) {
      return res.status(404).send("Task not found");
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: status,
    };

    res.status(200).send(tasks);
  }
);

// получение задачи по id

app.get("/tasks/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }
  res.status(200).send({ message: "Task finded", taskIndex });
});

// Получение задач исполнителю
app.get("/tasks", authenticateToken, (req, res) => {
  const HowTaskNeed = req.query.howtaskneed;
  const userId = req.user.id;
  console.log(req.user);
  console.log(authenticateToken);
  let taskList;
  if (HowTaskNeed === "AllTasks") {
    taskList = tasks;
  } else if (HowTaskNeed === "Vital") {
    taskList = tasks.filter(
      (task) => task.executor.id === userId && task.status.name !== "Completed"
    );
  } else {
    taskList = tasks.filter((task) => task.executor.id === userId);
  }

  res.status(200).json(taskList);
});

app.get("/priorities", (req, res) => {
  res.status(200).json(priorities);
});

// Получение статусов
app.get("/statuses", (req, res) => {
  res.status(200).json(statuses);
});

// Порт, на котором будет работать сервер
const PORT = 9995;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
