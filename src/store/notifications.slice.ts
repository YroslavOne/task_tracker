import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { loadState } from "./storage";
import { JWT_PERSISTENT_STATE, UserPersistentState } from "./user.slice";
import { RootState } from "./store";
import { Notification } from "../interfaces/notification.interface";

export interface NotificationsState {
  jwt: string | null;
  notifications: Notification[] | null;
  notificationErrorMessage?: string;
}

const initialState: NotificationsState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  notifications: null,
};

export const getNotifications = createAsyncThunk<
  NotificationsState,
  void,
  { state: RootState }
>("notifications", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const jwt = state.user.jwt;
  const { data } = await axios.get<NotificationsState>(
    `${PREFIX}notifications`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return data;
});

export const deleteNotification = createAsyncThunk(
  "tasks/deleteNotification",
  async (notificationId: number, { getState, rejectWithValue }) => {
    const jwt = getState().user.jwt;
    try {
      await axios.delete(`${PREFIX}notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return notificationId;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.notificationErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.notifications = action.payload;
        }
      )
      .addCase(getNotifications.rejected, (state, action) => {
        state.notificationErrorMessage = action.error.message;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications?.filter(
          (n) => n.id !== action.payload
        );
      });
    // .addCase(deleteNotificwation.rejected, (state, action) => {
    //   state.notificationErrorMessage = action.error.message;
    // });
  },
});

export default notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
