import { State } from "../reduxStore";

export const getIsAuth = (state: State) => state.auth.auth.isAuth;

export const getCurrentUser = (state: State) => state.auth.currentUser;