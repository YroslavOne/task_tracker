import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getTasks } from "../../store/tasks.slice";
import { useEffect } from "react";
import TaskScreen from "../../components/taskScreen/TaskScreen";

function MyTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filterDate, filterTitle } = useSelector(
    (s: RootState) => s.tasks
  );
  useEffect(() => {
    dispatch(getTasks("My"));
  }, [dispatch, filterDate, filterTitle]);
  return <TaskScreen tasks={tasks} />;
}
export default MyTask;
