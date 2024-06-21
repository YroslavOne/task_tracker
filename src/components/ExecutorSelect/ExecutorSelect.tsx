import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProfileAll } from "../../store/user.slice";
import { ProfileAll } from "../../interfaces/userForTask.interface";
import { ExecutorSelectedProps } from "./ExecutorSelect.props";


function ExecutorSelect({executorSelected, setExecutorSelected}: ExecutorSelectedProps){
const dispatch = useDispatch();
const executors: ProfileAll | undefined = useSelector((s:RootState)=>s.user.profileAll);
    const handleChange = (event: SelectChangeEvent) => {
      setExecutorSelected(Number(event.target.value) as number);
    };

    useEffect(() => {
        dispatch(getProfileAll());
      }, [dispatch]);

      return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={String(executorSelected)}
            label="Age"
            onChange={handleChange}
          >
            {
            executors?.map((ex)=>
                <MenuItem value={ex.id}>{ex.username}</MenuItem>
            )
            }
          </Select>
        </FormControl>
      </Box>
    );
}
export default ExecutorSelect
