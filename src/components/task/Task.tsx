import style from "./Task.module.css";
import Menu from "../../../public/image/task/MENU.svg";
import { TaskProps } from "./Task.props";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { completTask, deleteTask } from "../../store/tasks.slice";
import { setIdAndTitle } from "../../store/toggle.slice";
import { getTaskById } from "../../store/openTask.slice";
import { AppDispatch } from "../../store/store";

function Task({
  id,
  title,
  description,
  priority,
  status,
  date,
  image,
  activeLink,
}: TaskProps) {
  const [openedWindowActioans, setOpenedWindowActioans] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const openWindowActioans = () => {
    setOpenedWindowActioans(!openedWindowActioans);
  };
  const openTask = (id: number) => {
    if (activeLink) {
      dispatch(getTaskById({ id: id }));
      if (status.name === "Not Started") {
        dispatch(completTask({id, statusForTask: "In Progress" }));
      }
    }
  };

  const deleteTaskNow = (id: number) => {
    dispatch(deleteTask(id));
  };
  const editTaskNow = (id: number) => {
    dispatch(setIdAndTitle({ id, title: "Edit Task" }));
  };
  const completTaskNow = (id: number) => {
    dispatch(completTask({id, statusForTask: "Completed"}));
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
      <div onClick={() => openTask(id)} className={style["content"]}>
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
