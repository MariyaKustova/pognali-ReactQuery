import { State } from "../reduxStore";

export const getUsersInfo = (state: State) => state.usersPage.users;

export const getTotalCount = (state: State) => state.usersPage.totalCount;

export const getCurrentPage = (state: State) => state.usersPage.currentPage;

export const getIsFetching = (state: State) => state.usersPage.isFetching;

export const getFollowingInProgress = (state: State) => state.usersPage.followingInProgress;