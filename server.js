import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Пример базы данных в оперативной памяти
let users = [];
let tasks = [];

// Регистрация пользователя
app.post("/register", (req, res) => {
    console.log('hi')
  const { firstName, lastName, middleName, email, password, phone } = req.body;
  const user = { firstName, lastName, middleName, email, password, phone };
  users.push(user);
  res.status(201).send("User registered successfully");
});

// Аутентификация пользователя
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    res.status(401).send("Invalid email or password");
    console.log("hilog")
  } else {
    res.status(200).json({ message: "Login successful", user });
    console.log("hilo2g")

  }
});

// Добавление задачи
app.post("/tasks", (req, res) => {
  const { title, description, date, priority } = req.body;
  const task = { title, description, date, priority };
  tasks.push(task);
  res.status(201).send("Task added successfully");
});

// Получение всех задач
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Порт, на котором будет работать сервер
const PORT = 9995;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
