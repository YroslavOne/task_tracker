import style from "./AddAndEditTask.module.css";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { addTask, updateTask } from "../../store/tasks.slice";
import { Task } from "../../interfaces/task.interface";
import ExecutorSelect from "../ExecutorSelect/ExecutorSelect";
import DateInput from "../dateInput/DateInput";
import PrioritiesInput from "../prioritiesInput/PrioritiesInput";
import { toggle } from "../../store/toggle.slice";
import dayjs, { Dayjs } from "dayjs";
import ButtonStandard from "../buttonStandard/ButtonStandard";
import { ProfileAll } from "../../interfaces/userForTask.interface";
import { ImageListType } from "react-images-uploading";
import { fetchCountedStatuses } from "../../store/statuses.slice";

interface FormTask {
  title: string;
  image: File[] | string[];
  date: Dayjs | string;
  description: string;
  priority: string;
}

const AddAndEditTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, id } = useSelector((state: RootState) => state.toggle);

  const task = useSelector((state: RootState) =>
    state.tasks.tasks?.find((task) => task.id === id)
  );
  const { taskErrorMessage } = useSelector((state: RootState) => state.tasks);
  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormTask>();
  const [images, setImages] = useState<ImageListType | null>(
    task?.image ? [{ data_url: task?.image }] : null
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(task?.date)
  );
  const [titleHere, setTitleHere] = useState(task?.title ? task?.title : "");
  const [description, setDescription] = useState(
    task?.description ? task?.description : ""
  );
  const [priority, setPriority] = useState(
    task?.priority ? task?.priority.name : "Extreme"
  );
  const [executorSelected, setExecutorSelected] = useState<
    ProfileAll | undefined
  >(task?.executor);

  const closeOpen = () => {
    dispatch(toggle());
  };

  useEffect(() => {
    setValue("date", dayjs(selectedDate));
    setValue("title", titleHere);
    setValue("description", description);
    setValue("executor", executorSelected);
  }, [selectedDate, titleHere, description, executorSelected, setValue]);

  const onSubmit: SubmitHandler<FormTask> = (data) => {
    const dateForArr = dayjs.isDayjs(data.date)
      ? dayjs(data.date).format("DD/MM/YYYY")
      : data.date;

    const imgUrlOrNot = images
      ? images[0].file
        ? images
        : images[0].data_url
      : null;
    const taskData: Task = {
      executor: executorSelected,
      title: data.title,
      description: data.description,
      priority: priority,
      status: "Not Started",
      date: dateForArr,
      image: imgUrlOrNot,
    };

    if (id === null) {
      dispatch(addTask(taskData));
    } else {
      dispatch(updateTask({ taskId: id, taskData }));
    }

    reset();
    setSelectedDate(null);
    setImages([]);
    dispatch(toggle());
    dispatch(fetchCountedStatuses());
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
              {...register("executor", { required: "Executor is required" })}
              error={errors.executor?.message}
            />
          </div>
          <div className={style["description-image"]}>
            <div className={style["task-description"]}>
              <p>Task Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={12}
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
};

export default AddAndEditTask;
