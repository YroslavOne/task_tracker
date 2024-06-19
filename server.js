import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "your_secret_key"; // Используйте более сложный секретный ключ

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
    image: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
];
let tasks = [
  {
    id: 1,
    title: "Attend Nischal’s Birthday Party",
    description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
    priority: "Moderate",
    status: "Not Started",
    date: "11.06.2024",
    image: "https://img.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.webp",
  }
];

// Регистрация пользователя
app.post("/register", (req, res) => {
  const { firstName, lastName, middleName, email, password, phone } = req.body;
  const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1h' });

  const user = { firstName, lastName, middleName, email, password, phone, token };
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
    res.status(401).send({message: "Invalid email or password"});
  } else {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    user.token = token;
    res.status(200).json({ message: "Login successful", token });
  }
});

// Middleware для проверки и декодирования JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
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
  const user = users.find(u => u.email === userEmail);

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

// Добавление задачи
app.post("/tasks", authenticateToken, (req, res) => {
  const { title, description, date, priority } = req.body;
  const task = { title, description, date, priority };
  tasks.push(task);
  res.status(201).send("Task added successfully");
});

// Получение всех задач
app.get("/tasks", authenticateToken, (req, res) => {
  res.status(200).json(tasks);
});

// Порт, на котором будет работать сервер
const PORT = 9995;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
