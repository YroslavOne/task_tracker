import Input from "../../components/input/Input";
import Title from "../../components/title/Title";
import style from "./Login.module.css";
import User from "../../../public/image/iconFor/User.svg";
import Lock from "../../../public/image/iconFor/Lock.svg";
import Button from "../../components/button/Button";
import Image from "../../../public/image/start/Login.png";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user.slice";
// import axios from "axios";

export type LoginForm = {
  user: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (jwt) {
  //     navigate('/');
  //   }
  // }, [jwt, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }))
    try {
      const response = await fetch("http://localhost:9995/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        
        
      });
      if (response.status === 401) {
        const text = await response.text();
        setMessage(text); // Отобразить текст ошибки
        console.log(message);
      } else {
        const data = await response.json();
        setMessage(data.message); // Отобразить сообщение об успешной аутентификации
        localStorage.setItem("jwt", data.message)
        navigate('/');
        
        dispatch(userActions.addJwt(data.message))
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style["login"]}>
      <div className={style["container"]}>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <Title className={style["title"]}>Sign In</Title>
          <Input
            id="user"
            name="user"
            icon={User}
            placeholder="Enter Username"
            className={style["input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            icon={Lock}
            placeholder="Enter Password"
            className={style["input"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
