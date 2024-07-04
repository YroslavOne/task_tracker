import style from "./Dashboard.module.css";
import Pending from "./../../../public/image/dashboard/Pending.svg";
import Plus from "./../../../public/image/dashboard/taSK.svg";
import Task from "../../components/task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getTasks } from "../../store/tasks.slice";
import { useEffect, useState } from "react";
import AddAndEditTask from "../../components/addAndEditTask/AddAndEditTask";
import { toggle } from "../../store/toggle.slice";

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, filterDate, filterTitle } = useSelector(
    (s: RootState) => s.tasks
  );
  const openWindowForm = () => {
    dispatch(toggle());
  };
  useEffect(() => {
    dispatch(getTasks("AllTasks"));
  }, [filterDate, filterTitle, dispatch]);

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
        <div className={style["task"]}>
          {tasks ? (
            tasks.map((t) => (
              <Task
                key={t.id}
                id={t.id}
                title={t.title}
                date={t.date}
                description={t.description}
                priority={t.priority}
                status={t.status}
                image={t.image}
                activeLink={false}
              />
            ))
          ) : (
            <div>тютю задач</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
