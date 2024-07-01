import { useDispatch, useSelector } from "react-redux";
import style from "./SettingsMain.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ImageUpload from "../../../../components/ImageUpload/ImageUpload";
import { RootState } from "../../../../store/store";
import { getProfile, updateProfile } from "../../../../store/user.slice";
import InputForSettings from "../../../../components/inputForSettings/InputForSettings";
import ButtonStandard from "../../../../components/buttonStandard/ButtonStandard";
import { useForm } from "react-hook-form";
import { Profile } from "../../../../interfaces/user.interface";

function SettingsMain() {
  const { handleSubmit } = useForm();

  const dispatch = useDispatch();
  const {profile, editProfileErrorMessage} = useSelector((s: RootState) => s.user);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const [images, setImages] = useState(
    profile?.image ? [{ data_url: profile?.image }] : null
  );
  const [firstName, setFirstName] = useState<string | undefined>(profile?.firstName);
  const [lastName, setlastName] = useState<string | undefined>(profile?.lastName);
  const [email, setEmail] = useState<string | undefined>(profile?.email);
  const [contactNumber, setContactNumber] = useState<string | undefined>(profile?.phone);
  const [user, setUser] = useState<string | undefined>(profile?.userName);

  const onSubmit = () => {
    const imgUrlOrNot = images[0].file ? images : images[0].data_url
    const profileDate: Profile = {
      firstName: firstName,
      lastName: lastName,
      userName: user,
      email: email,
      phone: contactNumber,
      image: imgUrlOrNot,
    }
    dispatch(updateProfile(profileDate))
  };

  return (
    <div>
      <div className={style["back-ground"]}>
        <form className={style["container"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={style["head"]}>
            <h3 className={style["h3"]}>Account Information</h3>
            {/* <button className={style["button"]}>Go Back</button> */}
          </div>
          <div className={style["image-and-user"]}>
            <ImageUpload
              round={true}
              buttonOf={false}
              images={images}
              setImages={setImages}
            />
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
            <InputForSettings
              title="First Name"
              isValid={false}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputForSettings
              title="Last Name"
              isValid={false}
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
            <InputForSettings
              title="Email Address"
              isValid={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputForSettings
              title="Contact Number"
              isValid={false}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <InputForSettings
              title="User Name"
              isValid={false}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className={style["div-submit"]}>
            <ButtonStandard type="submit" className={style["submit"]}>
              Update Info
            </ButtonStandard>
            <NavLink to={"change-password"}>
              <ButtonStandard className={style["submit"]}>
                Change Password
              </ButtonStandard>
            </NavLink>
          </div>
          {editProfileErrorMessage && <p>{editProfileErrorMessage.message}</p>}
        </form>
      </div>
    </div>
  );
}
export default SettingsMain;
