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
>("tasks/getTasks", async (params, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  const { data } = await axios.get<TasksState>(`${PREFIX}tasks`, {
    params:{
      howtaskneed: params,
    },
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
    console.log(taskData);

    try {
      const formData = new FormData();
      Object.keys(taskData).forEach((key) => {
        if (key === "executor") {
          formData.append(key, JSON.stringify(taskData[key]));
        } else if (key === "priority") {
          formData.append(key, taskData[key]);
        } else if (key === "date") {
          formData.append(key, taskData[key]);
        } else if (key !== "image") {
          formData.append(key, taskData[key]);
        } else {
          formData.append("image", taskData.image[0].file);
        }
      });
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

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    { taskId, taskData }: { taskId: number; taskData: Task },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt;
    try {
      const formData = new FormData();

      Object.keys(taskData).forEach((key) => {
        if (key === "executor") {
          formData.append(key, JSON.stringify(taskData[key])); // Stringify the executor object
        } else if (key === "priority") {
          formData.append(key, taskData[key]);
        } else if (key === "date") {
          formData.append(key, JSON.stringify(taskData[key])); // Stringify date
        } else if (key !== "image") {
          formData.append(key, taskData[key]);
        } else if (taskData.image) {
          if (typeof taskData.image === "string") {
            formData.append("imageUrl", taskData.image); // Adding image URL
          } else if (taskData.image[0].file) {
            formData.append("image", taskData.image[0].file); // Adding image file
          }
        }
      });
      const { data } = await axios.put(`${PREFIX}tasks/${taskId}`, formData, {
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

export const completTask = createAsyncThunk(
  "tasks/complet",
  async (taskId: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt;
    try {
      const status = {
        name: "Completed",
        color: "#05A301",
      };
      const { data } = await axios.put(
        `${PREFIX}tasks/complet/${taskId}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number, { getState, rejectWithValue }) => {
    const jwt = getState().user.jwt;
    try {
      await axios.delete(`${PREFIX}tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return taskId;
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
        state.tasks = [...(state.tasks || []), action.payload];
      })
      .addCase(addTask.rejected, (state, action) => {
        state.taskErrorMessage = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks?.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.taskErrorMessage = action.payload as string;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.taskErrorMessage = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(state.tasks);
        state.tasks = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.taskErrorMessage = action.payload as string;
      })
      .addCase(completTask.pending, (state) => {
        state.taskErrorMessage = null;
      })
      .addCase(completTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(completTask.rejected, (state, action) => {
        state.taskErrorMessage = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;
