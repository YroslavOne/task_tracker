import style from "./TaskScreen.module.css";
import Task from "../../components/task/Task";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TaskСard from "../../components/taskCard/TaskCard";
import { TaskScreenProps } from "./TaskScreen.props";

function TaskScreen({ tasks }: TaskScreenProps) {
  const { open, id } = useSelector((s: RootState) => s.openTask);
  return (
    <div className={style["container"]}>
      <div className={style["list-task"]}>
        <div className={style["tasks-and-task"]}>
          <div className={!open ? style["task"] : style["task-and-openwindow"]}>
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
                  activeLink={true}
                />
              ))
            ) : (
              <div>Нет задач</div>
            )}
          </div>
          {open && <TaskСard id={id? id: 0} />}
        </div>
      </div>
    </div>
  );
}
export default TaskScreen;
