import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpenTaskState {
  open: boolean;
  id: null | number;
}

const initialState: OpenTaskState = {
  open: false,
  id: null,
};

const openTaskSlice = createSlice({
  name: 'openTask',
  initialState,
  reducers: {
    closeTask: (state) => {
      state.open = false;
    },
    getTaskById: (state, action: PayloadAction<{ id: number }>) => {
      state.id = action.payload.id;
      state.open = true;
    },
  },
});

export const { closeTask, getTaskById } = openTaskSlice.actions;

export default openTaskSlice.reducer;
