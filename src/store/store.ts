import { saveState } from "./storage";
import taskSlice from "./tasks.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: taskSlice 

  },
});

store.subscribe(()=>{
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
