import { ImageListType } from "react-images-uploading";

export interface TaskProps {
  key: number;
  id: number;
  title: string;
  description: string;
  priority: {
    name: string;
    color: string;
  } | string;
  status: {
    name: string;
    color: string;
  }
  | string;
  date:
    | {
        $D: number;
        $M: number;
        $Y: number;
      }
    | string;
  image: ImageListType;
  activeLink: boolean;
}
