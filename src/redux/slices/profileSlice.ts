import { AppDispatch, State } from "./../reduxStore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Post,
  ProfileFormValues,
  UserPhotos,
  UserProfile,
} from "../../pages/Profile/types";
import { profileAPI } from "../API/profile";
import { setErrorMessage } from "./securitySlice";
import { setErrors, setSuccess } from "./helpers";

export interface ProfileState {
  postsData: Post[];
  userProfile: UserProfile | null;
  status: string;
  error: string | null | undefined;
  isFetching: boolean;
}

const initialState: ProfileState = {
  postsData: [
    {
      id: "1",
      message: "Hi, how are you?",
      countLikes: 12,
    },
    {
      id: "2",
      message: "It is second post!",
      countLikes: 18,
    },
    {
      id: "3",
      message: "Hi, how are you?",
      countLikes: 2,
    },
    {
      id: "4",
      message: "It is second post!",
      countLikes: 19,
    },
    {
      id: "5",
      message: "Hi, how are you?",
      countLikes: 34,
    },
    {
      id: "6",
      message: "It is second post!",
      countLikes: 45,
    },
  ],
  userProfile: null,
  status: "",
  error: null,
  isFetching: false,
};

export const getProfile = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("profile/getProfile", async function (userId, { dispatch, rejectWithValue }) {
    const data = await profileAPI.getProfile(Number(userId));
    dispatch(setUserProfile(data));
});

export const getUserStatus = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("profile/getUserStatus", async function (userId, { dispatch }) {
  const data = await profileAPI.getStatus(Number(userId));
  dispatch(setUserStatus(data));
});

export const updateUserStatus = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>("profile/updateUserStatus", async function (status, { dispatch }) {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
});

export const savePhoto = createAsyncThunk<
  void,
  File,
  { dispatch: AppDispatch }
>("profile/savePhoto", async function (photo, { dispatch }) {
  const data = await profileAPI.savePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setUserPhotosSuccess(data.data.photos));
  }
});

export const saveProfile = createAsyncThunk<
  void,
  ProfileFormValues,
  { dispatch: AppDispatch; state: State }
>("profile/saveProfile", async function (profile, thunkApi) {
  const userId = thunkApi.getState().profile?.userProfile?.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0 && userId) {
    thunkApi.dispatch(setErrorMessage(null));
    thunkApi.dispatch(getProfile(userId));
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setNewPost: (state, action: PayloadAction<string>) => {
      const newPost: Post = {
        id: "7",
        message: action.payload,
        countLikes: 17,
      };
      state.postsData.push(newPost);
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.userProfile = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setUserPhotosSuccess: (state, action: PayloadAction<UserPhotos>) => {
      state.userProfile = {
        ...(state.userProfile as UserProfile),
        photos: action.payload,
      };
    },
  },  
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, setSuccess)
      .addCase(getProfile.rejected, (state, action) => {
        setErrors(state, "Server Error! Could not get a profile!");
      })
      .addCase(getUserStatus.fulfilled, (state) => setSuccess(state))
      .addCase(getUserStatus.rejected, (state) => {
        setErrors(state, "Server error! Could not get a status!");
      })
      .addCase(updateUserStatus.fulfilled, setSuccess)
      .addCase(updateUserStatus.rejected, (state) => {
        setErrors(state, "Server error! Failed to update status!");
      })
      .addCase(savePhoto.fulfilled, setSuccess)
      .addCase(savePhoto.rejected, (state) => {
        setErrors(state, "Server error! Failed to save photo!");
      })
      .addCase(saveProfile.fulfilled, setSuccess)
      .addCase(saveProfile.rejected, (state) => {
        setErrors(state, "Server error! Failed to save profile!");
      })
  },
});

export const {
  setNewPost,
  setUserProfile,
  setUserStatus,
  setUserPhotosSuccess,
} = profileSlice.actions;

export default profileSlice.reducer;
