import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import style from "./AddAndEditTask.module.css";
import { AddAndEditTaskProps } from "./AddAndEditTask.props";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTask } from "../../store/tasks.slice";
import { Task } from "../../interfaces/task.interface";
import ExecutorSelect from "../ExecutorSelect/ExecutorSelect";

interface FormTask {
  title: string;
  image: [];
  date: {
    $D: number;
    $y: number;
    $M: number;
  };
  description: string;
  priority: string;
}

function AddAndEditTask({ title, id }: AddAndEditTaskProps) {
  const dispatch = useDispatch();
  const { taskErrorMessage } = useSelector((state: RootState) => state.tasks);
  const [images, setImages] = useState();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
const [idTask, setIdTask] = useState(id)
const [executorSelected, setExecutorSelected] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("date", date);
  };

  const onSubmit = (data: FormTask) => {
    const taskData: Task = {
      executor: executorSelected,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 0,
      date: `${data.date.$D}.${data.date.$M + 1}.${data.date.$y}`,
      image: images,
    };
    dispatch(addTask(taskData));
    reset();
    setSelectedDate(null);
    setImages([]);
  };

  return (
    <form className={style["container"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={style["head"]}>
        <h3 className={style["h3"]}>{title}</h3>
        <button className={style["button"]}>Go Back</button>
        <div className={style["title"]}>
          <p>Title</p>
          <input {...register("title")} />
        </div>
        <div className={style["date"]}>
          <p>Date</p>
          <LocalizationProvider>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div className={style["priority"]}>
          <p>Priority</p>
          <input {...register("priority")} />
        </div>
        <div className={style["task-description"]}>
          <p>Task Description</p>
          <textarea {...register("description")} />
        </div>
        <div className={style["responsible"]}>
          <ExecutorSelect executorSelected={executorSelected} setExecutorSelected={setExecutorSelected}/>
          <input {...register("responsible")} />
        </div>
        <div className={style["upload-image"]}>
          <p>Upload Image</p>
          <ImageUpload images={images} setImages={setImages} />
        </div>
      </div>
      <button type="submit">Add Task</button>
      {taskErrorMessage && <p>{taskErrorMessage.message}</p>}
    </form>
  );
}
export default AddAndEditTask;
