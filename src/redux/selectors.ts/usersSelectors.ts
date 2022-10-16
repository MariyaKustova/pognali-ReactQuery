import { State } from "../reduxStore";

export const getTotalCount = (state: State) => state.usersPage.totalCount;

export const getCurrentPage = (state: State) => state.usersPage.currentPage;

export const getFollowingInProgress = (state: State) => state.usersPage.followingInProgress;

export const getUsersState = (state: State) => state.usersPage;