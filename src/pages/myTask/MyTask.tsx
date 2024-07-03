import style from "./MyTask.module.css";
import Pending from "./../../../public/image/dashboard/Pending.svg";
import Plus from "./../../../public/image/dashboard/taSK.svg";
import Task from "../../components/task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getTasks, getVitalTasks } from "../../store/tasks.slice";
import { useEffect, useState } from "react";
import { toggle } from "../../store/toggle.slice";
import TaskСard from "../../components/taskCard/TaskCard";
import cn from "classnames";

function MyTask() {
  const dispatch = useDispatch();
  const { tasks, filterDate, filterTitle } = useSelector(
    (s: RootState) => s.tasks
  );
  const openWindowForm = () => {
    dispatch(toggle());
  };
  const [windowCard, setWindowCard] = useState(false);
  useEffect(() => {
    dispatch(getTasks("My"));
  }, [dispatch, filterDate, filterTitle]);

  const arrayForRending = tasks?.filter((elem) => elem);
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
            <p onClick={openWindowForm}> Add task</p>
          </div>
        </div>
        <div>
          <p className={style["today"]}>
            {day} {mount} <span> &bull; Today</span>
          </p>
        </div>
        <div className={style["tasks-and-task"]}>
          <div
            className={
              !windowCard ? style["task"] : style["task-and-openwindow"]
            }
          >
            {arrayForRending ? (
              arrayForRending.map((t) => (
                <Task
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  date={t.date}
                  description={t.description}
                  priority={t.priority}
                  status={t.status}
                  image={t.image}
                />
              ))
            ) : (
              <div>тютю задач</div>
            )}
          </div>
          {windowCard && <TaskСard id={0} />}
        </div>
      </div>
    </div>
  );
}
export default MyTask;
