import Input from "../../components/input/Input";
import Title from "../../components/title/Title";
import style from "./Login.module.css";
import User from "../../../public/image/iconFor/User.svg";
import Lock from "../../../public/image/iconFor/Lock.svg";
import Button from "../../components/button/Button";
import Image from "../../../public/image/start/Login.png";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../store/user.slice";
import { RootState } from "../../store/store";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  useEffect(() => {}, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
    // navigate("/");
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email: email, password: password }));
  };

  return (
    <div className={style["login"]}>
      <div className={style["container"]}>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <Title className={style["title"]}>Sign In</Title>
          {loginErrorMessage && <h1>{loginErrorMessage}</h1>}

          <Input
            id="email"
            name="user"
            icon={User}
            placeholder="Enter Email"
            className={style["input"]}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            icon={Lock}
            placeholder="Enter Password"
            className={style["input"]}
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Login</Button>
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
