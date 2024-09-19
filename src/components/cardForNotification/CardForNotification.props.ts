import { ImageListType } from "react-images-uploading";

export interface CardForNotificationProps {
  title: string;
  priority: string;
  colorPriority: string;
  image: ImageListType;
  id: number;
  idNotification: number;
}
