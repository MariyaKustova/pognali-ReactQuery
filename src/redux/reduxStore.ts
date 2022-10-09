import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import appReducer, { AppState } from "./reducers/appReducer";
import authReducer, { AuthState } from "./reducers/authReducer";
import dialogsReducer, { DialogsState } from "./reducers/dialogsReducer";
import navbarReducer, { NavbarState } from "./reducers/navbarReducer";
import profileReducer, { ProfileState } from "./reducers/profileReducer";
import securityReducer, { SecurityState } from "./reducers/securityReducer";
import usersReducer, { UsersState } from "./reducers/usersReducer";

export interface State {
  profile: ProfileState,
  dialogs: DialogsState,
  navbar: NavbarState,
  usersPage: UsersState,
  auth: AuthState,
  security: SecurityState,
  app: AppState,
}

const reducers = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  security: securityReducer,
  app: appReducer,
});

const store = createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      applyMiddleware(thunkMiddleWare)
    )
);

export default store;
