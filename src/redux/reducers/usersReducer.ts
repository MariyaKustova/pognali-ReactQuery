import { User } from "../../components/Users/types";
import {
  FOLLOW,
  UNFOLLOW,
  SET_USERS,
  SET_TOTAL_COUNT_PAGES,
  SET_CURRENT_PAGE,
  TOGGLE_IS_FETCHING,
  TOGGLE_IS_FOLLOWING,
} from "../action";

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

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    }

    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    }

    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case SET_TOTAL_COUNT_PAGES: {
      return {
        ...state,
        totalCount: action.payload,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload,
      };
    }

    case TOGGLE_IS_FOLLOWING: {
      const { isFetching, userId } = action.payload;
      return {
        ...state,
        followingInProgress: isFetching
          ? [...state.followingInProgress, userId]
          : state.followingInProgress.filter((id) => id !== userId),
      };
    }

    default:
      return state;
  }
};

// ActionCreator

export const followSuccess = (userId: number) => ({
  type: FOLLOW,
  payload: userId,
});
export const unfollowSuccess = (userId: number) => ({
  type: UNFOLLOW,
  payload: userId,
});
export const setUsers = (users: any) => ({
  type: SET_USERS,
  payload: users,
});
export const setTotalCountPages = (totalCount: number) => ({
  type: SET_TOTAL_COUNT_PAGES,
  payload: totalCount,
});
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});
export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  payload: isFetching,
});
export const toggleIsFollowing = (isFetching: boolean, userId: number) => ({
  type: TOGGLE_IS_FOLLOWING,
  payload: {isFetching, userId},
});

export default usersReducer;
