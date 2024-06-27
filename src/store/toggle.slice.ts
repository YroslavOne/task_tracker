import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
  value: boolean;
  id: string;
  title: string;
}

const initialState: ToggleState = {
  value: false,
  id: "",
  title: 'Add New Task',
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    setIdAndTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.value = !state.value;

    },
  },
});

export const { toggle, setIdAndTitle } = toggleSlice.actions;

export default toggleSlice.reducer;
