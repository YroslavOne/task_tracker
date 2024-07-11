import style from "./Registration.module.css";
import SignUp from "../../../public/image/start/Registration.png";
import Firstname from "../../../public/image/iconFor/Firstname.svg";
import Lastname from "../../../public/image/iconFor/Lastname.svg";
import User from "../../../public/image/iconFor/User.svg";
import Email from "../../../public/image/iconFor/Email.svg";
import Lock from "../../../public/image/iconFor/Lock.svg";
import ConfirmPassword from "../../../public/image/iconFor/ConfirmPassword.svg";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userActions } from "../../store/user.slice";
import { AppDispatch, RootState } from "../../store/store";
import { useForm } from "react-hook-form";

export interface RegisterForm {
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterForm>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmit = async (data: RegisterForm) => {
    dispatch(userActions.clearLoginError());
    dispatch(registerUser(data));
  };

  return (
    <div className={style["registration"]}>
      <div className={style["container"]}>
        <div className={style["container-image"]}>
          <img className={style["image"]} src={SignUp} alt="" />
        </div>
        <form className={style["form"]} onSubmit={handleSubmit(onSubmit)}>
          <Title className={style["title"]}>Sign Up</Title>
          {registerErrorMessage && (
            <h1 className={style["error"]}>{registerErrorMessage}</h1>
          )}

          <Input
            id="firstname"
            icon={Firstname}
            placeholder="Enter First Name"
            className={style["input"]}
            isValid={!errors.firstName}
            {...register("firstName", { required: "First name is required" })}
          />
          <Input
            id="lastname"
            icon={Lastname}
            placeholder="Enter Last Name"
            className={style["input"]}
            isValid={!errors.lastName}
            {...register("lastName", { required: "Last name is required" })}
          />
          <Input
            id="username"
            icon={User}
            placeholder="Enter Username"
            className={style["input"]}
            isValid={!errors.userName}
            {...register("userName", { required: "User name is required" })}
          />
          <Input
            id="email"
						type="email"
            icon={Email}
            placeholder="Enter Email"
            className={style["input"]}
            isValid={!errors.email}
            {...register("email", { required: "Email is required" })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <Input
					pattern=".{8,}"
            type="password"
            id="password"
            icon={Lock}
            placeholder="Enter Password"
            className={style["input"]}
            isValid={!errors.password}
            {...register("password", { required: "Password is required" })}
          />
          <Input
            type="password"
            id="confirmPassword"
            icon={ConfirmPassword}
            placeholder="Confirm Password"
            className={style["input"]}
            isValid={!errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          <Button type="submit" className={style["button"]}>
            Register
          </Button>
          <p className={style["p"]}>
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Registration;
