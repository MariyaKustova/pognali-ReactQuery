import { AxiosResponse } from "axios";
import {
  ActionCreatorWithPayload,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch } from "./../reduxStore";
import { usersAPI } from "../../API/users";
import { User, UsersResponse } from "../../components/Users/types";

export interface UsersState {
  users: User[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
}

const initialState: UsersState = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const getUsers = createAsyncThunk<
  void,
  { currentPage: number; pageSize: number },
  { dispatch: AppDispatch }
>(
  "users/getUsers",
  async function ({ currentPage = 1, pageSize = 5 }, { dispatch }) {
    dispatch(toggleIsFetching(true));
    const data: UsersResponse = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCountPages(data.totalCount));
  }
);

const followUnfollowFlow = async (
  dispatch: AppDispatch,
  userId: number,
  apiMethod: (id: number) => Promise<AxiosResponse<any, any>>,
  actionCreator: ActionCreatorWithPayload<number, string>
) => {
  dispatch(toggleIsFollowing({ isFetching: true, userId }));
  const data = await apiMethod(userId);
  if (data.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing({ isFetching: false, userId }));
};

export const follow = createAsyncThunk<void, number, { dispatch: AppDispatch }>(
  "users/follow",
  async function (userId, { dispatch }) {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  }
);

export const unfollow = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("users/unfollow", async function (userId, { dispatch }) {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow.bind(usersAPI),
    unfollowSuccess
  );
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
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    toggleIsFollowing: (
      state,
      action: PayloadAction<{ isFetching: boolean; userId: number }>
    ) => {
      state.followingInProgress = action.payload.isFetching
        ? [...state.followingInProgress, action.payload.userId]
        : state.followingInProgress.filter(
            (id) => id !== action.payload.userId
          );
    },
  },
});

export const {
  followSuccess,
  unfollowSuccess,
  setUsers,
  setTotalCountPages,
  setCurrentPage,
  toggleIsFetching,
  toggleIsFollowing,
} = usersSlice.actions;

export default usersSlice.reducer;
