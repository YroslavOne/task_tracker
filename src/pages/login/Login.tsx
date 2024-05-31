import Input from '../../components/input/Input';
import Title from '../../components/title/Title';
import style from './Login.module.css';
import User from '../../../public/image/iconFor/User.svg'
import Lock from '../../../public/image/iconFor/Lock.svg'
import Button from '../../components/button/Button';
import Image from '../../../public/image/start/Login.png'


function Login(){

    return(
        <div className={style['login']}>
            <div className={style['container']}>
            <div className={style['form']}>
                <Title className={style['title']}>Sign In</Title>
                <Input icon={User} placeholder="Enter Username" className={style['input']}/>
                <Input icon={Lock} placeholder="Enter Password" className={style['input']} type='password'/>
                <Button>Login</Button>
                <p className={style['p']}>Don’t have an account? <a href='#'>Create One</a></p>

            </div>
            <div className={style['container-image']}>
            <img className={style['image']} src={Image} alt="" />
            </div>
        </div>
        </div>
    )
}
export default Login