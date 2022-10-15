import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../API/auth";
import { securityAPI } from "../../API/security";
import {
  requestLoginData,
  ResponseCaptcha,
  ResponseLogin,
  ResponseLogout,
} from "../../components/Login/types";
import { AppDispatch } from "../reduxStore";
import { authUser, setCurrentUser, setUserData } from "./authSlice";

export interface SecurityState {
  messages: string[] | null;
  captcha: string | null;
}

const initialState: SecurityState = {
  messages: [],
  captcha: null,
};

export const getCaptchaUrl = createAsyncThunk<
void,
void,
{ dispatch: AppDispatch }
>(
  "security/getCaptchaUrl",
  async function (_, { dispatch }) {
    const data: ResponseCaptcha = await securityAPI.getCaptchaUrl();
    dispatch(setCapthaUrl(data.url));
  }
);

export const loginUser = createAsyncThunk<
void,
requestLoginData,
{ dispatch: AppDispatch }
>(
  "security/loginUser",
  async function (requestData, { dispatch }) {
    const data: ResponseLogin = await authAPI.login(requestData);
    switch (String(data.resultCode)) {
      case "0":
        dispatch(authUser());
        dispatch(setCapthaUrl(null));
        dispatch(setErrorMessage(null));
        break;
      case "1":
        dispatch(setErrorMessage(data.messages));
        break;
      case "10":
        dispatch(setErrorMessage(data.messages));
        dispatch(getCaptchaUrl());
        break;
      default:
        break;
    }
  }
);

export const logoutUser = createAsyncThunk<
void,
void,
{ dispatch: AppDispatch }
>(
  "security/logoutUser",
  async function (_, { dispatch }) {
    const data: ResponseLogout = await authAPI.logout();
    if (data.resultCode === 0) {
      dispatch(
        setUserData({ id: null, email: null, login: null, isAuth: false })
      );
      dispatch(setCurrentUser(null));
    }
  }
);

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string[] | null>) => {
      state.messages = action.payload;
    },
    setCapthaUrl: (state, action: PayloadAction<string | null>) => {
      state.captcha = action.payload;
    },
  },
});

export const { setErrorMessage, setCapthaUrl } = securitySlice.actions;

export default securitySlice.reducer;
