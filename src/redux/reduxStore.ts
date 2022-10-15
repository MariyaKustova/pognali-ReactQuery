import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import dialogsReducer from "./slices/dialogsSlice";
import navbarReducer from "./slices/navbarSlice";
import profileReducer from "./slices/profileSlice";
import securityReducer from "./slices/securitySlice";
import usersReducer from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
    navbar: navbarReducer,
    profile: profileReducer,
    security: securityReducer,
    usersPage: usersReducer,
  },
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
