import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getProfileAll } from "../../store/user.slice";
import {
  ProfileAll,
} from "../../interfaces/userForTask.interface";
import { ExecutorSelectedProps } from "./ExecutorSelect.props";
import style from "./ExecutorSelect.module.css";
import cn from "classnames";

const ExecutorSelect = React.forwardRef<HTMLDivElement, ExecutorSelectedProps>(
  ({ executorSelected, setExecutorSelected, error }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const executors: ProfileAll | [] =
      useSelector((state: RootState) => state.user.profileAll) || [];
    const [executor, setExecutor] = useState("");

    useEffect(() => {
      dispatch(getProfileAll());
    }, [dispatch]);

    useEffect(() => {
      if (executorSelected && (executors.length > 0)) {
        const selectedExecutor: ProfileAll | undefined = executors.find(
          (element) => element.email === executorSelected.email
        );
        setExecutor(selectedExecutor ? String(selectedExecutor.id) : "");
      }
    }, [executorSelected, executors]);

    const handleChange = (event: SelectChangeEvent) => {
      const selectedExecutor = executors.find(
        (ex) => ex.id === event.target.value
      );
      if (selectedExecutor) {
        setExecutorSelected(selectedExecutor);
        setExecutor(event.target.value);
      }
    };

    return (
      <Box sx={{ width: "70%" }} ref={ref}>
        <FormControl fullWidth>
          <InputLabel
            id="executor-select-label"
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "90%",
              alignItems: "center",
              top: "-14px",
            }}
          >
            Executor
          </InputLabel>
          <Select
            className={cn(style["select"], { [style["error"]]: error })}
            labelId="executor-select-label"
            id="executor-select"
            value={executor}
            label="Executor"
            onChange={handleChange}
          >
            {executors.map((ex, index) => (
              <MenuItem
                className={style["menu-item"]}
                value={ex.id}
                key={index}
              >
                {ex.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);

export default ExecutorSelect;
