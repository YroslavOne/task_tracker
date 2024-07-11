import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  value: boolean;
  windowNotification: boolean;
  id: number | null;
  title: string;
}

const initialState: ToggleState = {
  windowNotification: false,
  value: false,
  id: null,
  title: "Add New Task",
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
      state.id = null;
      state.title = "Add New Task";
    },
    setIdAndTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.value = !state.value;
    },
    toggleWindowNotification: (state) => {
      state.windowNotification = !state.windowNotification;
    },
  },
});

export const { toggle, setIdAndTitle, toggleWindowNotification } =
  toggleSlice.actions;

export default toggleSlice.reducer;
