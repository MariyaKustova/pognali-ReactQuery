import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../API/users";
import { User, UsersResponse } from "../../pages/Users/types";
import { AppDispatch } from "../reduxStore";

export interface NavbarState {
  friends: User[];
}

const initialState: NavbarState = {
  friends: [],
};

export const getFriends = createAsyncThunk<
  void,
  { currentPage?: number; pageSize?: number },
  { dispatch: AppDispatch }
>(
  "navbar/getFriends",
  async function ({ currentPage = 1, pageSize = 5 }, { dispatch }) {
    const data: UsersResponse = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setFriends(data.items));
  }
);

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<User[]>) => {
      state.friends = action.payload
        .filter((friend: User) => !Boolean(friend.followed))
        .splice(0, 3);
    },
  },
});

const { setFriends } = navbarSlice.actions;

export default navbarSlice.reducer;
