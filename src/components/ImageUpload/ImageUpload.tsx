import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ImageUploadProps } from './ImageUpload.props';

function ImageUpload ({images, setImages}: ImageUploadProps) {
//   const dispatch = useDispatch();
  console.log(images)
//   const images = useSelector((state: RootState) => state.images.images);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
    // if (imageList[0]?.file) {
    //   dispatch(addImage(imageList[0].file));
    // }
  };
  
//   useCallback(async () => {
//     const formData = new FormData();
//     images.forEach((image) => formData.append('images', image));

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       dispatch(clearImages());
//     } catch (error) {
//       console.error('Error uploading the files:', error);
//     }
//   }, [images, dispatch]);

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
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            <div className="upload__image-wrapper">
              <button
                type="button"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              {/* <button type="button" onClick={onImageRemoveAll}>Remove all images</button> */}
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button type="button" onClick={() => onImageUpdate(index)}>Update</button>
                    <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
    </div>
  );
};

export default ImageUpload;