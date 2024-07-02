import style from "./Task.module.css";
import Menu from "../../../public/image/task/MENU.svg";
import { TaskProps } from "./Task.props";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { completTask, deleteTask } from "../../store/tasks.slice";
import { setIdAndTitle } from "../../store/toggle.slice";

function Task({
  id,
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
  const editTaskNow = (id) => {
    dispatch(setIdAndTitle({ id, "Edit Task": title }));
  };
  const completTaskNow = (id) => {
    dispatch(completTask(id));
  };

  return (
    <div className={style["container"]} key={id}>
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
              <li onClick={() => editTaskNow(id)}>Edit</li>
              <li onClick={() => deleteTaskNow(id)}>Delete</li>
              <li onClick={() => completTaskNow(id)}>Finish</li>
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
          <p className={style["created"]}>Сomplete: {date}</p>
        </div>
      </div>
    </div>
  );
}
export default Task;
