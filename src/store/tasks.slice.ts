import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import { loadState } from "./storage";
import { JWT_PERSISTENT_STATE, UserPersistentState } from "./user.slice";
import { RootState } from "./store";
import { Task } from "../interfaces/task.interface";

export interface TasksState {
  jwt: string | null;
  tasks?: Task[];
  taskErrorMessage?: string;
}

const initialState: TasksState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const getTasks = createAsyncThunk<
  TasksState,
  void,
  { state: RootState }
>("user/getTasks", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  const { data } = await axios.get<TasksState>(`${PREFIX}tasks`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData: Task, { getState, rejectWithValue }) => {
    const jwt = getState().user.jwt;
    try {
      const formData = new FormData();
      Object.keys(taskData).forEach((key) => {
        if (key === "executor") {
          formData.append(key, JSON.stringify(taskData[key])); // Stringify the executor object
        } else if (key !== "image") {
          formData.append(key, taskData[key]);
        } else {
          formData.append("image", taskData.image[0].file); // Assuming image is an array of image objects from react-images-uploading
        }
      });
      console.log(taskData)
      const { data } = await axios.post(`${PREFIX}tasks`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskError: (state) => {
      state.taskErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.taskErrorMessage = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (!state.tasks) {
          state.tasks = [];
        }
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.taskErrorMessage = action.payload;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;