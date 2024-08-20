import style from "./TaskCard.module.css";
import { TaskСardProps } from "./TaskСard.props";
import { useDispatch, useSelector } from "react-redux";
import {deleteTask, getTask } from "../../store/tasks.slice";
import { setIdAndTitle } from "../../store/toggle.slice";
import wastebasket from "../../../public/image/cardItem/waste-basket.svg";
import edit from "../../../public/image/cardItem/edit.svg";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { closeTask } from "../../store/openTask.slice";
import useOutsideClick from '../../hooks/useClickOutside/useClickOutside.tsx'
function TaskСard({
  id
}: TaskСardProps) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(getTask(id))
  },[dispatch, id])
   const { open} = useSelector((s: RootState) => s.openTask);

  const { task } = useSelector((state: RootState)=> state.tasks)
  const deleteTaskNow = () => {
    dispatch(deleteTask(id));
    dispatch(closeTask());
  };

  const editTaskNow = () => {
    dispatch(setIdAndTitle({ id, "Edit Task": task?.title }));
  };
  const close = () => {
    dispatch(closeTask());
  };

	const ref = useOutsideClick(() => {
		if(open){
   close()}
  });

  return (
    <div ref={ref} className={style["container"]} key={task?.id}>
       <div className={style["head"]}> <button onClick={close}>Close</button></div>
      <div className={style["img-and-options"]}>
        <img className={style["image"]} src={task?.image} />
        <div className={style["options"]}>
          <h2>{task?.title}</h2>
          <p className={style["status"]}>
            Priority:{" "}
            <span style={{ color: task?.priority.color }}>{task?.priority.name}</span>
          </p>
          <p className={style["status"]}>
            Status: <span style={{ color: task?.status.color }}>{task?.status.name}</span>
          </p>
          <p className={style["created"]}>Сomplete: {task?.date}</p>
        </div>
      </div>
      <div className={style["description"]}>
        <p>{task?.description}</p>
      </div>
      <div className={style["buttons"]}>
        <div className={style["buttons-flex"]}>
        <button className={style["button"]}>
          <img onClick={deleteTaskNow} src={wastebasket} />
        </button>
        <button className={style["button"]}>
          <img onClick={editTaskNow} src={edit} />
        </button>
        </div>
      </div>
    </div>
  );
}
export default TaskСard;
