import jwt from "jsonwebtoken";
import config from "../config.js";
import { users } from "../models/user.js";

export const register = (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const id = users.length + 1;
  const token = jwt.sign({ id: id, email: email }, config.SECRET_KEY, {
    expiresIn: "1h",
  });
  const emailFind = users.find((u) => u.email === email);

  if (emailFind) {
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
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).send({ message: "Invalid email or password" });
  } else {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    user.token = token;
    res.status(200).json({ message: "Login successful", token });
  }
};
