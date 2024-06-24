import { saveState } from "./storage";
import taskSlice from "./tasks.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { configureStore } from "@reduxjs/toolkit";
import prioritiesReducer from "./priorities.slice";
import statusesReducer from "./statuses.slice";
import toggleReducer from './toggle.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: taskSlice,
    priorities: prioritiesReducer,
    statuses: statusesReducer,
    toggle: toggleReducer,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
