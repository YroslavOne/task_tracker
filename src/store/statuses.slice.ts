import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Status {
  name: string;
  color: string;
  valueCounted: number;
}

interface StatusesState {
  statuses: Status[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusesState = {
  statuses: [],
  loading: false,
  error: null,
};

export const fetchStatuses = createAsyncThunk(
  "statuses/fetchStatuses",
  async () => {
    const response = await axios.get("http://localhost:9995/statuses");
    return response.data;
  }
);

export const fetchCountedStatuses = createAsyncThunk(
  "statuses/fetchCountedStatuses",
  async () => {
    const response = await axios.get("http://localhost:9995/statuses/count");
    return response.data;
  }
);

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStatuses.fulfilled,
        (state, action: PayloadAction<Status[]>) => {
          state.loading = false;
          state.statuses = action.payload;
        }
      )
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch statuses";
      })
      .addCase(fetchCountedStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCountedStatuses.fulfilled,
        (state, action: PayloadAction<Status[]>) => {
          state.loading = false;
          state.statuses = action.payload;
        }
      )
      .addCase(fetchCountedStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch counted statuses";
      });
  },
});

export default statusesSlice.reducer;
