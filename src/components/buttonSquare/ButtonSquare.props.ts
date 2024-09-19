import { ButtonHTMLAttributes } from "react";

export interface ButtonSquareProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  value: string | number | undefined;
}
