import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { AppDispatch } from "./../reduxStore";
import { usersAPI } from "../API/users";
import { User, UsersResponse } from "../../pages/Users/types";
import { setErrors, setPending, setSuccess } from "./helpers";

export interface UsersState {
  users: User[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  error: string | null | undefined;
}

const initialState: UsersState = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  error: null,
};

export const getUsers = createAsyncThunk<
  void,
  { currentPage: number; pageSize: number },
  { dispatch: AppDispatch; rejectWithValue: any }
>(
  "users/getUsers",
  async function ({ currentPage = 1, pageSize = 5 }, { dispatch }) {
    const data: UsersResponse = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCountPages(data.totalCount));
  }
);

export const follow = createAsyncThunk<void, number, { dispatch: AppDispatch }>(
  "users/follow",
  async function (userId, { dispatch }) {
    dispatch(toggleIsFollowing({ isFetching: true, userId }));
    const data = await usersAPI.follow(userId);
    dispatch(toggleIsFollowing({ userId }));
    if (data.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleIsFollowing({ isFetching: false, userId }));
  }
);

export const unfollow = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("users/unfollow", async function (userId, { dispatch }) {
  dispatch(toggleIsFollowing({ isFetching: true, userId }));
  const data = await usersAPI.unfollow(userId);
  dispatch(toggleIsFollowing({ userId }));
  if (data.data.resultCode === 0) {
    dispatch(unfollowSuccess(userId));
  }
  dispatch(toggleIsFollowing({ isFetching: false, userId }));
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    followSuccess: (state, action: PayloadAction<number>) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload) {
          return { ...user, followed: true };
        }
        return user;
      });
    },
    unfollowSuccess: (state, action: PayloadAction<number>) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload) {
          return { ...user, followed: false };
        }
        return user;
      });
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setTotalCountPages: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleIsFollowing: (
      state,
      action: PayloadAction<{ userId: number; isFetching?: boolean }>
    ) => {
      state.followingInProgress =
        action.payload.isFetching ?? state.isFetching
          ? [...state.followingInProgress, action.payload.userId]
          : state.followingInProgress.filter(
              (id) => id !== action.payload.userId
            );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, setSuccess)
      .addCase(getUsers.pending, setPending)
      .addCase(getUsers.rejected, (state) => {
        setErrors(state, "Server Error! Users have not been uploaded!");
      })
      .addCase(follow.fulfilled, (state) => setSuccess(state))
      .addCase(follow.pending, setPending)
      .addCase(follow.rejected, (state) => {
        setErrors(state, "Server error! Subscription failed!");
      })
      .addCase(unfollow.fulfilled, setSuccess)
      .addCase(unfollow.pending, setPending)
      .addCase(unfollow.rejected, (state) => {
        setErrors(state, "Server error! Unsubscribe failed!");
      });
  },
});

export const {
  followSuccess,
  unfollowSuccess,
  setUsers,
  setTotalCountPages,
  setCurrentPage,
  toggleIsFollowing,
} = usersSlice.actions;

export default usersSlice.reducer;
