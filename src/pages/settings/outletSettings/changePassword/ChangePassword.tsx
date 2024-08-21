import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  getProfile,
  updatePassword,
  userActions,
} from "../../../../store/user.slice";
import style from "./ChangePassword.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputForSettings from "../../../../components/inputForSettings/InputForSettings";
import ButtonStandard from "../../../../components/buttonStandard/ButtonStandard";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Ghost from "../../../../../public/image/ghost.png"

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ChangePasswordForm>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  

  const onSubmit = (data: ChangePasswordForm) => {
    dispatch(userActions.clearEditProfileErrorMessage());
    dispatch(
      updatePassword({
        password: data.currentPassword,
        newPassword: data.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        reset()
      })
      .catch((error) => {
        toast.error(`Failed to update password: ${error.message}`);
      });
  };
  return (
    <div>
      <ToastContainer />
      <div className={style["back-ground"]}>
        <form className={style["container"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={style["head"]}>
            <h3 className={style["h3"]}>Account Information</h3>
            <NavLink to={"/settings"}>
              <button className={style["button"]}>Go Back</button>
            </NavLink>
          </div>
          <div className={style["image-and-user"]}>
          {profile?.image ? <img src={`${window.location.origin}/${profile.image}`} className={style["image"]} /> : <img src={Ghost} className={style["image"]} />}
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
              title="Current Password"
              type="password"
              isValid={!errors.currentPassword}
              {...register("currentPassword", {
                required: "Current Password is required",
              })}
              className={errors.currentPassword ? style.error : ""}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <InputForSettings
              title="New Password"
              type="password"
              isValid={!errors.newPassword}
              {...register("newPassword", {
                required: "New Password is required",
              })}
              className={errors.newPassword ? style.error : ""}
            />
            <InputForSettings
              title="Confirm Password"
              type="password"
              isValid={!errors.confirmPassword}
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
              className={errors.confirmPassword ? style.error : ""}
            />
          </div>
          <div className={style["div-submit"]}>
            <ButtonStandard type="submit" className={style["submit"]}>
              Update Password
            </ButtonStandard>
            <NavLink to={"/settings"}>
              <ButtonStandard className={style["submit"]}>
                Cancel
              </ButtonStandard>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
