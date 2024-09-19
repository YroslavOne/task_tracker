import { ReactNode } from "react";

export interface MenuLink {
  children: ReactNode;
  image:string;
  link: string;
  isActive?: boolean;
  className: string;
  onClick?: () => void;
}
