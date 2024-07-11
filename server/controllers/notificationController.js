import { notifications } from "../models/notification.js";

export const getNotifications = (req, res) => {
  const userId = req.user.id;

  const userNotifications = notifications.filter((n) => n.userId === userId);

  res.status(200).json(userNotifications);
};

export const deleteNotification = (req, res) => {
  const notificationId = parseInt(req.params.id);

  const notificationIndex = notifications.findIndex(
    (n) => n.id === notificationId
  );

  if (notificationIndex === -1) {
    return res.status(404).send({ message: "Notification not found" });
  }

  notifications.splice(notificationIndex, 1);

  res.status(200).send({ message: "Notification deleted successfully" });
};
