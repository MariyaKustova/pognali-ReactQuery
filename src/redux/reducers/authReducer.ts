import { SET_CURRENT_USER } from "./../action";
import { SET_USER_DATA } from "../action";
import { UserProfile } from "../../components/Profile/types";

export interface AuthState {
  auth: {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  },
  currentUser: UserProfile | null,
}

const initialState: AuthState = {
  auth: {
    id: null,
    email: null,
    login: null,
    isAuth: false,
  },
  currentUser: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        auth: { ...action.payload },
      };
    }

    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    default:
      return state;
  }
};

export const setUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });

export const setCurrentUser = (profile: UserProfile | null) => ({
  type: SET_CURRENT_USER,
  payload: profile,
});

export default authReducer;
