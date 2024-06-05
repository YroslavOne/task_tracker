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
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";

export type RegisterForm = {
  lastName: string;
  firstName: string;
  middleName: string;
  emails: string;
  phones: string;
  passwords: string;
};

function Registration() {
  const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [middleNameValue, setMiddleNameValue] = useState('');
    const [email, setEmailValue] = useState('');
    const [password, seePasswordValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('8999');
    const [messageValue, setMessageValue] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(JSON.stringify({ firstNameValue, lastNameValue, middleNameValue, email, password, phoneValue }))
        try {
            const response = await fetch('http://localhost:9995/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstNameValue, lastNameValue, middleNameValue, email, password, phoneValue }),
            });
            
            const data = await response.text(); // Прочитать ответ как текст, а не как JSON
            setMessageValue(data); // Отобразить текстовый ответ
            console.log(messageValue)

        } catch (error) {
            console.error('Error:', error);
            console.log(messageValue)
        }
    };

  return (
    <div className={style["registration"]}>
      <div className={style["container"]}>
        <div className={style["container-image"]}>
          <img className={style["image"]} src={SignUp} alt="" />
        </div>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <Title className={style["title"]}>Sign Up</Title>
          <Input
            name="firstname"
            icon={Firstname}
            placeholder="Enter First Name"
            className={style["input"]}
            value={firstNameValue} 
            onChange={(e) => setFirstNameValue(e.target.value)}
          />
          <Input
            name="lastname"
            icon={Lastname}
            placeholder="Enter Last Name"
            className={style["input"]}
            value={lastNameValue} 
            onChange={(e) => setLastNameValue(e.target.value)}
          />
          <Input
            name="user"
            icon={User}
            placeholder="Enter Username"
            className={style["input"]}
            value={middleNameValue} 
            onChange={(e) => setMiddleNameValue(e.target.value)}
          />
          <Input
            name="email"
            icon={Email}
            placeholder="Enter Email"
            className={style["input"]}
            value={email} 
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Input
            name="lock"
            icon={Lock}
            placeholder="Enter Password"
            className={style["input"]}
            value={password} 
            onChange={(e) => seePasswordValue(e.target.value)}
          />
          <Input
            name="confirmPassword"
            icon={ConfirmPassword}
            placeholder="Confirm Password"
            className={style["input"]}
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
