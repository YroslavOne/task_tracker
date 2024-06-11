import { ReactNode } from "react";

export interface MenuLink {
  children: ReactNode;
  image:
    | "dashboard"
    | "help"
    | "my-task"
    | "settings"
    | "task-categories"
    | "vital-task"
    | "logout";
  link: string;
  isActive: boolean;
  className: string;
}

// ButtonHTMLAttributes<HTMLButtonElement>
