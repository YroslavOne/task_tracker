import style from "./Dashboard.module.css";
import Pending from "./../../../public/image/dashboard/Pending.svg";
import Plus from "./../../../public/image/dashboard/taSK.svg";
import Task from "../../components/task/Task";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {

  const d = new Date();
  const day = d.getDate();
  const mount = d.toLocaleDateString("en-US", { month: "long" });
  return (
    <div className={style["container"]}>
      <div className={style["list-task"]}>
        <div className={style["top-bar"]}>
          <div className={style["title"]}>
            <img src={Pending} alt="" />
            <p className={style["todo"]}>To-Do</p>
          </div>
          <div className={style["button"]}>
            <img className={style["image"]} src={Plus} alt="" />
            <p> Add task</p>
          </div>
        </div>
        <div>
          <p className={style["today"]}>
            {day} {mount} <span> &bull; Today</span>
          </p>
        </div>
        <div className={style["task"]}>
          {" "}
          <Task
            title="Attend Nischal’s Birthday Party"
            date="11.06.2024"
            description="Buy gifts on the way and pick up cake from the bakery. (6 PM |Fresh Elements) Fresh Elements) Fresh Elements)"
            priority="Moderate"
            status="Not Started"
            image="https://img.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.webp"
          />{" "}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
