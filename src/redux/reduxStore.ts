import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import navbarReducer from "./reducers/navbarReducer";
import profileReducer from "./reducers/profileReducer";
import securityReducer from "./reducers/securityReducer";
import usersReducer from "./reducers/usersReducer";

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
