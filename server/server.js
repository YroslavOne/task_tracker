import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import config from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import priorityRoutes from "./routes/priorityRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notifications", notificationRoutes);
app.use("/statuses", statusRoutes);
app.use("/priorities", priorityRoutes);

const PORT = config.PORT || 9995;
export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const token = req.url.split("?token=")[1];
  if (!token) {
    ws.close();
    return;
  }

  jwt.verify(token, config.SECRET_KEY, (err, user) => {
    if (err) {
      ws.close();
      return;
    }

    ws.userId = user.id;

    ws.on("message", (message) => {
      console.log(`Received message => ${message}`);
    });

    ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));
  });
});
