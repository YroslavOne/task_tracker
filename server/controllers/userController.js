import { users } from "../models/user.js";

export const getUserProfile = (req, res) => {
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
};

export const getAllUsers = (req, res) => {
  const user = [];
  users.map((u) => {
    user.push({
      username: u.userName,
      email: u.email,
      id: u.id,
    });
  });
  res.status(200).json(user);
};

export const updateUserProfile = (req, res) => {
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
};

export const updatePassword = (req, res) => {
  const userId = req.user.id;
  const { password, newPassword } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);
  const userSearch = users.filter((u) => u.id === userId);
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

  res.status(200).send({ message: "Password updated successfully", users: users[userIndex] });
};
