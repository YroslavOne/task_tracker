import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getTasks, taskActions } from "../../store/tasks.slice";
import { useEffect } from "react";
import TaskScreen from "../../components/taskScreen/TaskScreen";

function VitalTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filterDate, filterTitle, whatScreen } = useSelector(
    (s: RootState) => s.tasks
  );
  dispatch(taskActions.filterWhatScreen({ whatScreen: "Vital" }));
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, filterDate, filterTitle, whatScreen]);

  return <TaskScreen tasks={tasks} />;
}
export default VitalTask;
