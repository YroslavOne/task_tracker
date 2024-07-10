import { Task } from "./task.interface";

export interface Notification {
  userId: number;
  task: Task;
  id: number;
}
