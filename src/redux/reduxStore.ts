import { combineReducers, createStore } from "redux";
import dialogsReducer from "./reducers/dialogsReducer";
import navbarReducer from "./reducers/navbarReducer";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";

const reducers = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
})

const store = createStore(reducers);

export default store;
