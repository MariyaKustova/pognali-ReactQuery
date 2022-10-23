import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../API/auth";
import { profileAPI } from "../API/profile";
import { UserProfile } from "../../pages/Profile/types";
import { AppDispatch } from "../reduxStore";
import { setAppErrors } from "./appSlice";

export interface Auth {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

export interface AuthState {
  auth: Auth;
  currentUser: UserProfile | null;
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

export const authUser = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "auth/authUser",
  async function (_, { dispatch }) {
    try {
      const data = await authAPI.auth();
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;

        dispatch(setUserData({ id, email, login, isAuth: true }));
        const profileData = await profileAPI.getProfile(id);
        dispatch(setCurrentUser(profileData));
      } else {
        throw new Error(data.messages[0]);
      }
    } catch (error: any) {
      dispatch(setAppErrors(error.message));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Auth>) => {
      state.auth = { ...action.payload };
    },
    setCurrentUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUserData, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
