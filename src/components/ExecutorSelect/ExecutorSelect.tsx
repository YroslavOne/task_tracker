import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getProfileAll } from "../../store/user.slice";
import { ProfileAll } from "../../interfaces/userForTask.interface";
import { ExecutorSelectedProps } from "./ExecutorSelect.props";
import style from "./ExecutorSelect.module.css";
import cn from "classnames";

interface selectedExecutorState {
  username: string;
  email: string;
  id: number;
}

function ExecutorSelect({
  executorSelected,
  setExecutorSelected,
  error,
}: ExecutorSelectedProps) {
  const dispatch = useDispatch<AppDispatch>();
  const executors: ProfileAll | undefined = useSelector(
    (s: RootState) => s.user.profileAll
  );
  const [executor, setExecutor] = useState("");
  useEffect(() => {
    dispatch(getProfileAll());
  }, [dispatch]);

  useEffect(() => {
    if (executorSelected && executors) {
      const selectedExecutor: selectedExecutorState | null = executors.find(
        (element: ProfileAll) => element.email === executorSelected.email
      );
      setExecutor(selectedExecutor ? String(selectedExecutor.id) : "");
    }
  }, [executorSelected, executors]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedExecutor = executors?.find(
      (ex) => ex.id === Number(event.target.value)
    );
    if (selectedExecutor) {
      setExecutorSelected(selectedExecutor);
      setExecutor(event.target.value);
    }
  };

  return (
    <Box sx={{ width: "70%" }}>
      <FormControl fullWidth>
        <InputLabel id="executor-select-label">Executor</InputLabel>
        <Select
          className={cn(style["select"], { [style["error"]]: error })}
          labelId="executor-select-label"
          id="executor-select"
          value={executor}
          label="Executor"
          onChange={handleChange}
        >
          {executors?.map((ex, index) => (
            <MenuItem className={style["menu-item"]} value={ex.id} key={index}>
              {ex.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ExecutorSelect;
