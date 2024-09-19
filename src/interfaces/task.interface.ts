import { ImageListType } from "react-images-uploading";
import { ProfileAll } from "./userForTask.interface";

export interface Task {
  id: number;
  executor: ProfileAll | null;
  title: string;
  description: string;
  priority:
    | {
        name: string;
        color: string;
      }
    | string;
  status:
    | {
        name: string;
        color: string;
      }
    | string;
  date: string;
  image: ImageListType;
}
