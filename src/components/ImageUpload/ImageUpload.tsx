import ImageUploading, { ImageListType } from "react-images-uploading";
import { ImageUploadProps } from "./ImageUpload.props";
import UploadImage from "../../../public/image/form/Upload-image.svg";
import { useState } from "react";
import style from "./ImageUpload.module.css";

function ImageUpload({ images, setImages }: ImageUploadProps) {
  const [displayButton, setDisplayButton] = useState(!images?.length);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
    setDisplayButton(!imageList?.length);
  };
  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className={style["container"]}>
            {displayButton && (
              <button
                className={style["button-upload"]}
                type="button"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <img src={UploadImage} />
                <p>Drag&Drop files here</p>
                <p>or</p>
                <button className={style["button"]}>Browse</button>
              </button>
            )}
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button type="button" className={style["button"]} onClick={() => onImageUpdate(index)}>
                    Update
                  </button>
                  <button type="button" className={style["button"]} onClick={() => onImageRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;
