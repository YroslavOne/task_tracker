import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "your_secret_key"; // Используйте более сложный секретный ключ

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/';
    if (!fs.existsSync(dir)){
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
    firstName: "hi",
    lastName: "hi",
    userName: "hi",
    email: "1",
    password: "1",
    phone: "hi",
    token: "hi",
    image:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
];
let tasks = [
  {
    id: 1,
    executor: {
      userName: "hi",
      email: "1",
    },
    title: "Attend Nischal’s Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
    priority: "Moderate",
    status: "Not Started",
    date: "11.06.2024",
    image:
      "https://img.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.webp",
  },
];

// Регистрация пользователя
app.post("/register", (req, res) => {
  const { firstName, lastName, middleName, email, password, phone } = req.body;
  const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "1h" });

  const user = {
    firstName,
    lastName,
    middleName,
    email,
    password,
    phone,
    token,
  };
  users.push(user);
  // const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  // user.token = token;
  res.status(201).send({ message: "Login successful", token });
});

// Аутентификация пользователя
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    res.status(401).send({ message: "Invalid email or password" });
  } else {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
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
  const userEmail = req.user.email;
  const user = users.find((u) => u.email === userEmail);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName,
    email: user.email,
    phone: user.phone,
    image: user.image,
  });
});
app.get("/login/profile/all", authenticateToken, (req, res) => {
  const user = [];
  users.map((u) => {
    user.push({
      username: u.userName,
      email: u.email,
    });
  });
  res.status(200).json(user);
});

// Добавление задачи
app.post("/tasks", authenticateToken, upload.single('image'), (req, res) => {
  const { executor, title, description, priority, status, date } = req.body;
  const image = req.file ? req.file.path : null;

  let parsedExecutor;
  try {
    parsedExecutor = JSON.parse(executor);
  } catch (error) {
    return res.status(400).send({ message: "Invalid executor format" });
  }

  const id = tasks.length + 1;
  const task = {
    id,
    executor: parsedExecutor,
    title,
    description,
    priority,
    status,
    date,
    image,
  };

  tasks.push(task);
  console.log(task);
  res.status(201).send(task);
});

// Обновление задачи
app.put("/tasks/:id", authenticateToken, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { executor, title, description, priority, status, date } = req.body;
  const image = req.file ? req.file.path : null;

  const taskIndex = tasks.findIndex(task => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    executor: JSON.parse(executor), // Parse string to JSON if executor is sent as a string
    title,
    description,
    priority,
    status,
    date,
    image: image || tasks[taskIndex].image,
  };

  res.status(200).send("Task updated successfully");
});

// Получение задач исполнителю
app.get("/tasks", authenticateToken, (req, res) => {
  const userEmail = req.user.email;
  const user = users.find((u) => u.email === userEmail);
  const taskList = tasks.filter((task) => task.executor.email === user.email);
  res.status(200).json(taskList);
});

// Порт, на котором будет работать сервер
const PORT = 9995;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});