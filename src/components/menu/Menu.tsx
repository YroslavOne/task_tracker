import ButtonSquare from "../buttonSquare/ButtonSquare";
import style from "./Menu.module.css";
import Bell from "./../../../public/image/menu/top/bell.svg";
import Loop from "../../../public/image/menu/top/Search.svg";
import Calendar from "../../../public/image/menu/top/calendar.svg";
import Today from "./component/Today";

function Menu() {
  return (
    <div className={style["container"]}>
      <div className={style["logo"]}>
        Dash<span>board</span>
      </div>
      <div className={style["search"]}>
        <input placeholder="Search your task here..." className={style["input"]}/>
        <ButtonSquare image={Loop} className={style["loop"]} />
      </div>
      <div className={style["two-button"]}>
        <ButtonSquare image={Bell} className={style["button-square"]}/>
        <ButtonSquare image={Calendar} />
      </div>
        <Today/>
    </div>
  );
}
export default Menu;
