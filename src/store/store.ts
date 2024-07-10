import { saveState } from "./storage";
import taskSlice from "./tasks.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { configureStore } from "@reduxjs/toolkit";
import prioritiesSlice from "./priorities.slice";
import statusesSlice from "./statuses.slice";
import toggleSlice from "./toggle.slice";
import openTaskSlice from "./openTask.slice";
import notificationSlice from "./notifications.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: taskSlice,
    priorities: prioritiesSlice,
    statuses: statusesSlice,
    toggle: toggleSlice,
    openTask: openTaskSlice,
    notifications: notificationSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
