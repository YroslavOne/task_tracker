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
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register, userActions } from "../../store/user.slice";
import { RootState } from "../../store/store";

export type RegisterForm = {
  lastname: { value: string };
  firstname: { value: string };
  username: { value: string };
  email: { value: string };
  password: { value: string };
};

function Registration() {
  // const [firstNameValue, setFirstNameValue] = useState("");
  // const [lastNameValue, setLastNameValue] = useState("");
  // const [middleNameValue, setMiddleNameValue] = useState("");
  // const [email, setEmailValue] = useState("");
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [messageValue, setMessageValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  // useEffect(() => {}, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & RegisterForm;
    const { lastname, firstname, username, email, password } = target;
    await sendRegister(
      lastname.value,
      firstname.value,
      username.value,
      email.value,
      password.value
    );
    // navigate("/");
  };

  const sendRegister = async (
    lastname: string,
    firstname: string,
    username: string,
    email: string,
    password: string
  ) => {
    dispatch(
      register({
        lastName: lastname,
        firstName: firstname,
        userName: username,
        email: email,
        password: password,
      })
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(JSON.stringify({ firstNameValue, lastNameValue, middleNameValue, email, password, phoneValue }))
  //     try {
  //         const response = await fetch('http://localhost:9995/register', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ firstNameValue, lastNameValue, middleNameValue, email, password, phoneValue }),
  //         });

  //         const data = await response.text(); // Прочитать ответ как текст, а не как JSON
  //         setMessageValue(data); // Отобразить текстовый ответ
  //         navigate('/auth/login')

  //     } catch (error) {
  //         console.error('Error:', error);
  //         console.log(messageValue)
  //     }
  // };

  return (
    <div className={style["registration"]}>
      <div className={style["container"]}>
        <div className={style["container-image"]}>
          <img className={style["image"]} src={SignUp} alt="" />
        </div>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <Title className={style["title"]}>Sign Up</Title>
          {registerErrorMessage && <h1>{registerErrorMessage}</h1>}

          <Input
            name="firstname"
            id="firstname"
            icon={Firstname}
            placeholder="Enter First Name"
            className={style["input"]}
            // value={firstNameValue}
            // onChange={(e) => setFirstNameValue(e.target.value)}
          />
          <Input
            name="lastname"
            id="lastname"
            icon={Lastname}
            placeholder="Enter Last Name"
            className={style["input"]}
            // value={lastNameValue}
            // onChange={(e) => setLastNameValue(e.target.value)}
          />
          <Input
            name="user"
            id="username"
            icon={User}
            placeholder="Enter Username"
            className={style["input"]}
            // value={middleNameValue}
            // onChange={(e) => setMiddleNameValue(e.target.value)}
          />
          <Input
            name="email"
            id="email"
            icon={Email}
            placeholder="Enter Email"
            className={style["input"]}
            // value={email}
            // onChange={(e) => setEmailValue(e.target.value)}
          />
          <Input
            name="lock"
            id="password"
            icon={Lock}
            placeholder="Enter Password"
            className={style["input"]}
            value={password}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Input
            name="confirmPassword"
            id="confirmPassword"
            icon={ConfirmPassword}
            placeholder="Confirm Password"
            className={style["input"]}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className={style["button"]}>Register</Button>
          <p className={style["p"]}>
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Registration;
