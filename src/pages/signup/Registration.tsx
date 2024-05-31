import style from './Registration.module.css'
import SignUp from '../../../public/image/start/Registration.png'
import Firstname from '../../../public/image/iconFor/Firstname.svg'
import Lastname from '../../../public/image/iconFor/Lastname.svg'
import User from '../../../public/image/iconFor/User.svg'
import Email from '../../../public/image/iconFor/Email.svg'
import Lock from '../../../public/image/iconFor/Lock.svg'
import ConfirmPassword from '../../../public/image/iconFor/ConfirmPassword.svg'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Title from '../../components/title/Title'

function Registration() {
  return (
    <div className={style["registration"]}>
      <div className={style["container"]}>
        <div className={style["container-image"]}>
            <img className={style["image"]} src={SignUp} alt="" />
        </div>
        <div className={style["form"]}>
          <Title className={style["title"]}>Sign Up</Title>
        <Input icon={Firstname} placeholder="Enter First Name" className={style['input']}/>
        <Input icon={Lastname} placeholder="Enter Last Name" className={style['input']}/>
        <Input icon={User} placeholder="Enter Username" className={style['input']}/>
        <Input icon={Email} placeholder="Enter Email" className={style['input']}/>
        <Input icon={Lock} placeholder="Enter Password" className={style['input']}/>
        <Input icon={ConfirmPassword} placeholder="Confirm Password" className={style['input']}/>
        <Button className={style["button"]}>Register</Button>
        <p className={style["p"]}>Already have an account? <a href='#'>Sign In</a></p>
        </div>
      </div>
    </div>
  );
}
export default Registration
