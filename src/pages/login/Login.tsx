import Input from "../../components/input/Input";
import Title from "../../components/title/Title";
import style from "./Login.module.css";
import User from "../../../public/image/iconFor/User.svg";
import Lock from "../../../public/image/iconFor/Lock.svg";
import Button from "../../components/button/Button";
import Image from "../../../public/image/start/Login.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../store/user.slice";
import { AppDispatch, RootState } from "../../store/store";
import { useForm } from "react-hook-form";

interface ChangeForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeForm>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmit = async (data: ChangeForm) => {
    dispatch(userActions.clearLoginError());
    dispatch(login({ email: data.email, password: data.password }));
  };

  return (
    <div className={style["login"]}>
      <div className={style["container"]}>
        <form className={style["form"]} onSubmit={handleSubmit(onSubmit)}>
          <Title className={style["title"]}>Sign In</Title>
          {loginErrorMessage && <h1 className={style["error"]}>{loginErrorMessage}</h1>}

          <Input
            id="email"
            icon={User}
            placeholder="Enter Email"
            isValid={!errors.email}
            {...register("email", { required: "Email is required" })}
            className={style["input"]}
          />

          <Input
            id="password"
            icon={Lock}
            placeholder="Enter Password"
            type="password"
            isValid={!errors.password}
            {...register("password", { required: "Password is required" })}
            className={style["input"]}
          />

          <Button type="submit">Login</Button>
          <p className={style["p"]}>
            Don’t have an account? <Link to="/auth/register">Create One</Link>
          </p>
        </form>
        <div className={style["container-image"]}>
          <img className={style["image"]} src={Image} alt="" />
        </div>
      </div>
    </div>
  );
}
export default Login;
