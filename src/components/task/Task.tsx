import style from "./Task.module.css";
import Menu from "../../../public/image/task/MENU.svg";
import { TaskProps } from "./Task.props";

function Task({title, description, priority, status, date, image}: TaskProps) {
  return (
    <div className={style["container"]}>
      <div className={style["top-bar"]}>
        <div
          className={style["status"]}
          style={{ border: "solid 2px rgba(242, 30, 30, 1)" }}
        ></div>
        <img src={Menu} alt="" />
      </div>
      <div className={style["content"]}>
        <div className={style["description"]}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={style["information"]}>
            <p className={style["priority"]}>
              Priority: <span style={{ color: "blue" }}>{priority}</span>
            </p>
            <p className={style["priority"]}>
              Status: <span style={{ color: "blue" }}>{status}</span>
            </p>
          </div>
        </div>
        <div className={style["image-date"]}>
          <img
            className={style["image"]}
            src={image}
            alt=""
          />
          <p className={style["created"]}>Created on: {date}</p>
        </div>
      </div>
    </div>
  );
}
export default Task;
