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
import { RootState } from "../../store/store";
import { getProfileAll } from "../../store/user.slice";
import { ProfileAll } from "../../interfaces/userForTask.interface";
import { ExecutorSelectedProps } from "./ExecutorSelect.props";
import style from './ExecutorSelect.module.css'

function ExecutorSelect({
  executorSelected,
  setExecutorSelected,
}: ExecutorSelectedProps) {
  const dispatch = useDispatch();
  const executors: ProfileAll | undefined = useSelector(
    (s: RootState) => s.user.profileAll
  );
  const handleChange = (event: SelectChangeEvent) => {
    setExecutorSelected(Number(event.target.value) as number);
  };

  useEffect(() => {
    dispatch(getProfileAll());
  }, [dispatch]);

  return (
    <Box sx={{ width: "70%" }}>
      <FormControl fullWidth>
        <Select
          className={style["select"]}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(executorSelected)}
          onChange={handleChange}
        >
          {executors?.map((ex) => (
            <MenuItem className={style["menu-item"]} value={ex.id}>{ex.username}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default ExecutorSelect;
