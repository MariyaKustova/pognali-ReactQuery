import { setCapthaUrl, setErrorMessage } from "./reducers/securityReducer";
import { Dispatch } from "redux";
import { authAPI } from "../API/auth";
import { profileAPI } from "../API/profile";
import { usersAPI } from "../API/users";
import { securityAPI } from "../API/security";
import {
  requestLoginData,
  ResponseCaptcha,
  ResponseDataLogin,
  ResponseDataLogout,
} from "../components/Login/types";
import { UsersResponse } from "../components/Users/types";
import { setCurrentUser, setUserData } from "./reducers/authReducer";
import { setUserProfile, setUserStatus } from "./reducers/profileReducer";
import {
  followSuccess,
  unfollowSuccess,
  setUsers,
  toggleIsFetching,
  toggleIsFollowing,
  setTotalCountPages,
} from "./reducers/usersReducer";
import { appInitSuccess } from "./reducers/appReducer";

//Users

export const getUsers =
  (currentPage: number, PAGE_SIZE: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    const data: UsersResponse = await usersAPI.getUsers(currentPage, PAGE_SIZE);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCountPages(data.totalCount))
  };

const followUnfollowFlow = async (
  dispatch: Dispatch,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleIsFollowing(true, userId));
  const data = await apiMethod(userId);
  if (data.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing(false, userId));
};

export const follow = (userId: number) => async (dispatch: Dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
};

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
};

//security

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
  const data: ResponseCaptcha = await securityAPI.getCaptchaUrl();
  dispatch(setCapthaUrl(data.url));
};

//auth

export const authUser = () => async (dispatch: Dispatch) => {
  const data = await authAPI.auth();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;

    dispatch(setUserData(id, email, login, true));
    const profileData = await profileAPI.getProfile(id);
    dispatch(setCurrentUser(profileData));
  }
};

export const loginUser =
  (requestData: requestLoginData) => async (dispatch: any) => {
    const data: ResponseDataLogin = await authAPI.login(requestData);
    switch (String(data.resultCode)) {
      case "0":
        dispatch(authUser());
        dispatch(setCapthaUrl(null));
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
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  const data: ResponseDataLogout = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
    dispatch(setCurrentUser(null));
  }
};

//profile

export const getProfile = (userId: number) => async (dispatch: Dispatch) => {
  const data = await profileAPI.getProfile(Number(userId));
  dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
  const data = await profileAPI.getStatus(Number(userId));
  dispatch(setUserStatus(data));
};

export const updateUserStatus =
  (status: string) => async (dispatch: Dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };

// app

export const initApp = () => (dispatch: any) => {
  let promise = dispatch(authUser());
  Promise.all([promise]).then(() => dispatch(appInitSuccess()));
};
