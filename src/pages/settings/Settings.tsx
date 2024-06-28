import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import style from "./Settings.module.css";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { getProfile } from "../../store/user.slice";

function Settings() {
    const dispatch = useDispatch();
    const profile = useSelector((s:RootState)=>s.user.profile)
      useEffect(() => {
        dispatch(getProfile());
      }, [dispatch]);
console.log(profile)

  return (
    <div>
      <div className={style["back-ground"]}>
        <form className={style["container"]}>
          <div className={style["head"]}>
            <h3 className={style["h3"]}>Account Information</h3>
            {/* <button className={style["button"]}>Go Back</button> */}
          </div>
          <div className={style["image-and-user"]}>
            <img src={profile?.image} alt="" />
            <div className={style["email-and-user"]}>
              <div className={style["user"]}>
                <p>
                  {profile?.firstName} {profile?.lastName}
                </p>
              </div>
              <p className={style["email"]}>{profile?.email}</p>
            </div>
          </div>
          <div className={style["content"]}>
            <div className={style["title"]}>
              <p>Title</p>
              <input
              // value={titleHere}
              // onChange={(e) => setTitleHere(e.target.value)}
              />
            </div>

            <div className={style["upload-image"]}>
              <p>Upload Image</p>
              {/* <ImageUpload images={images} setImages={setImages} /> */}
            </div>
          </div>

          <div className={style["div-submit"]}>
            <button type="submit" className={style["submit"]}>
              Add Task
            </button>
          </div>
          {/* {taskErrorMessage && <p>{taskErrorMessage.message}</p>} */}
        </form>
      </div>
      );
    </div>
  );
}
export default Settings;
