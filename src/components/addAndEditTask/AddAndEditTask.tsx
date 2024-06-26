// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import style from "./AddAndEditTask.module.css";
import { AddAndEditTaskProps } from "./AddAndEditTask.props";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTask, updateTask } from "../../store/tasks.slice";
import { Task } from "../../interfaces/task.interface";
import ExecutorSelect from "../ExecutorSelect/ExecutorSelect";
import DateInput from "../dateInput/DateInput";
import PrioritiesInput from "../prioritiesInput/PrioritiesInput";
import { toggle } from "../../store/toggle.slice";

interface FormTask {
  title: string;
  image: [];
  date: {
    $D: number;
    $H: number;
    $L: string;
    $M: number;
    $W: number;
    $d: string;
    $isDayjsObject: boolean;
    $m: number;
    $ms: number;
    $s: number;
    $u: number | undefined;
    $y: number;
  };
  description: string;
  priority: string;
}

function AddAndEditTask({ title, id }: AddAndEditTaskProps) {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks?.find((task) => task.id === id)
  );

  const { taskErrorMessage } = useSelector((state: RootState) => state.tasks);
  const [images, setImages] = useState();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [titleHere, setTitleHere] = useState(null);
  // const [idTask, setIdTask] = useState(id);
  const [priority, setPriority] = useState(0);
  const [executorSelected, setExecutorSelected] = useState(null);
  const closeOpen = () => {
    dispatch(toggle());
  };
  console.log(task);
  // useEffect(() => {
  //   if (id) {
  //     dispatch(getTasks());
  //   }
  // }, [dispatch]);
  // console.log(selectedDate);

  const onSubmit = (data: FormTask) => {
    console.log(data.date);

    const taskData: Task = {
      executor: executorSelected,
      title: data.title,
      description: data.description,
      priority: priority,
      status: 0,
      date: data.date,
      image: images,
    };
    dispatch(addTask(taskData));

    // if (!id) {
    //   console.log("awdawdawd");
    //   dispatch(addTask(taskData));
    // } else {
    //   console.log("taskData");
    //   dispatch(updateTask(id, taskData));
    // }

    reset();
    setSelectedDate(null);
    setImages([]);
    dispatch(toggle());
  };

  return (
    <div className={style["back-ground"]}>
      <form className={style["container"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["head"]}>
          <h3 className={style["h3"]}>{title}</h3>
          <button onClick={closeOpen} className={style["button"]}>
            Go Back
          </button>
        </div>
        <div className={style["content"]}>
          <div className={style["title"]}>
            <p>Title</p>
            <input
              value={titleHere}
              onChange={(e) => setTitleHere(e.target.value)}
              // {...register("title")}
            />
          </div>
          <DateInput
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setValue={setValue}
          />

          <PrioritiesInput priority={priority} setPriority={setPriority} />
          <div className={style["responsible"]}>
            <ExecutorSelect
              executorSelected={executorSelected}
              setExecutorSelected={setExecutorSelected}
            />
          </div>
          <div className={style["description-image"]}>
            <div className={style["task-description"]}>
              <p>Task Description</p>
              <textarea
                rows="12"
                placeholder="Start writing here....."
                {...register("description")}
              />
            </div>

            <div className={style["upload-image"]}>
              <p>Upload Image</p>
              <ImageUpload images={images} setImages={setImages} />
            </div>
          </div>
        </div>

        <div className={style["div-submit"]}>
          <button type="submit" className={style["submit"]}>
            Add Task
          </button>
        </div>
        {taskErrorMessage && <p>{taskErrorMessage.message}</p>}
      </form>
    </div>
  );
}
export default AddAndEditTask;
