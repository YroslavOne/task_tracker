import { ImageListType } from "react-images-uploading";

export interface ImageUploadProps {
  images: ImageListType | null;
   setImages: (value: ImageListType) => void;
   round?: boolean;
   buttonOf?: boolean;
}