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
import dayjs from "dayjs";
import ButtonStandard from "../buttonStandard/ButtonStandard";

interface FormTask {
  title: string;
  image: [];
  date:
    | {
        $D: number;
        $M: number;
        $y: number;
      }
    | string;
  description: string;
  priority: string;
}

function AddAndEditTask() {
  const dispatch = useDispatch();
  const { title, id } = useSelector((state: RootState) => state.toggle);

  const task = useSelector((state: RootState) =>
    state.tasks.tasks?.find((task) => task.id === id)
  );
  const taskParms = task;
  const { taskErrorMessage } = useSelector((state: RootState) => state.tasks);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [images, setImages] = useState(
    task?.image ? [{ data_url: task?.image }] : null
  );
  const [selectedDate, setSelectedDate] = useState(dayjs(task?.date));
  const [titleHere, setTitleHere] = useState(task?.title ? task?.title : "");
  const [description, setDescription] = useState(
    task?.description ? task?.description : ""
  );
  const [priority, setPriority] = useState(
    task?.priority ? task?.priority.name : "Extreme"
  );
  const [status, setStatus] = useState(
    task?.status ? task?.status.name : "Not Started"
  );
  const [executorSelected, setExecutorSelected] = useState(task?.executor);
  const closeOpen = () => {
    dispatch(toggle());
  };

  setValue("date", dayjs(selectedDate));
  setValue("title", titleHere);
  setValue("description", description);

  const onSubmit = (data: FormTask) => {
    const dateForArr =
      "$D" in data.date
        ? `${
            String(data.date.$M).length
              ? "0" + (data.date.$M + 1)
              : data.date.$M + 1
          }.${
            String(data.date.$D).length === 1
              ? "0" + data.date.$D
              : data.date.$D
          }.${data.date.$y}`
        : data.date;
    const imgUrlOrNot = images ? images[0].file ? images : images[0].data_url: null;
    const taskData: Task = {
      executor: executorSelected,
      title: data.title,
      description: data.description,
      priority: priority,
      status: status,
      date: dateForArr,
      image: imgUrlOrNot,
    };
    if (id === "") {
      dispatch(addTask(taskData));
    } else {
      dispatch(updateTask({ taskId: id, taskData }));
    }

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
            />
          </div>
          <DateInput
            setValue={setValue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="12"
                placeholder="Start writing here....."
              />
            </div>

            <div className={style["upload-image"]}>
              <p>Upload Image</p>
              <ImageUpload images={images} setImages={setImages} />
            </div>
          </div>
        </div>

        <div className={style["div-submit"]}>
          <ButtonStandard type="submit">Add Task</ButtonStandard>
        </div>
        {taskErrorMessage && <p>{taskErrorMessage.message}</p>}
      </form>
    </div>
  );
}
export default AddAndEditTask;
