import ButtonSquare from "../buttonSquare/ButtonSquare";
import style from "./Menu.module.css";
import bell from './../../../public/image/menu/top/bell.svg'

function Menu(){
return(
    <div>
        <div className={style["logo"]}>Dashboard</div>
        <div className={style["search"]}></div>
        <div className={style["two-button"]}>
            <ButtonSquare image={bell}/>
        </div>
        <div><p>Tuesday<span>today</span></p></div>
    </div>

)
}
export default Menu