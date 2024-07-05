import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Priority {
  name: string;
  color: string;
}

interface PrioritiesState {
  priorities: Priority[];
  loading: boolean;
  error: string | null;
}

const initialState: PrioritiesState = {
  priorities: [],
  loading: false,
  error: null,
};

export const fetchPriorities = createAsyncThunk(
  "priorities/fetchPriorities",
  async () => {
    const response = await axios.get("http://localhost:9995/priorities");
    return response.data;
  }
);

const prioritiesSlice = createSlice({
  name: "priorities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriorities.fulfilled, (state, action) => {
        state.loading = false;
        state.priorities = action.payload;
      })
      .addCase(fetchPriorities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch priorities";
      });
  },
});

export default prioritiesSlice.reducer;
