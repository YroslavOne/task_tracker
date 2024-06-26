import style from "./Task.module.css";
import Menu from "../../../public/image/task/MENU.svg";
import { TaskProps } from "./Task.props";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/tasks.slice";

function Task({
  id,
  key,
  title,
  description,
  priority,
  status,
  date,
  image,
}: TaskProps) {
  const [openedWindowActioans, setOpenedWindowActioans] = useState(false);
  const dispatch = useDispatch();
  const openWindowActioans = () => {
    setOpenedWindowActioans(!openedWindowActioans);
  };
  const deleteTaskNow = (id) => {
    dispatch(deleteTask(id));
  };
  // const day = String(date.$D).length === 1 ? "0" + date.$D : date.$D;
  // const mounth = String(date.$M).length === 1 ? "0" + date.$M : date.$M;
  // const year = date.$Y;
  console.log(date)

  return (
    <div className={style["container"]} key={key}>
      <div className={style["top-bar"]}>
        <div
          className={style["status"]}
          style={{ border: "solid 2px rgba(242, 30, 30, 1)" }}
        ></div>
        <div className={style["menu-actions"]}>
          <img
            src={Menu}
            alt=""
            className={style["dote-for-menu"]}
            onClick={openWindowActioans}
          />
          {openedWindowActioans && (
            <ul>
              <li>Edit</li>
              <li onClick={() => deleteTaskNow(id)}>Delete</li>
              <li>Finish</li>
            </ul>
          )}
        </div>
      </div>
      <div className={style["content"]}>
        <div className={style["description"]}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={style["information"]}>
            <p className={style["priority"]}>
              Priority:{" "}
              <span style={{ color: priority.color }}>{priority.name}</span>
            </p>
            <p className={style["priority"]}>
              Status: <span style={{ color: status.color }}>{status.name}</span>
            </p>
          </div>
        </div>
        <div className={style["image-date"]}>
          <img className={style["image"]} src={image} alt="" />
          <p className={style["created"]}>
            Created on: 
          </p>
        </div>
      </div>
    </div>
  );
}
export default Task;
