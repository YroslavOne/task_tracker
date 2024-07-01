import { ImageListType } from "react-images-uploading";

export interface ImageUploadProps {
  images: ImageListType;
   setImages: (value: ImageListType) => void;
   round: boolean;
   buttonOf: boolean;
}