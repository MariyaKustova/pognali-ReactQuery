import { configureStore } from "@reduxjs/toolkit";
import dialogsReducer from "./slices/dialogsSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    profile: profileReducer,
  },
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
