import { UsersState } from "../../components/Users/types";
import { FOLLOW, UNFOLLOW, SET_USERS, SET_TOTAL_COUNT_PAGES, SET_CURRENT_PAGE, TOGGLE_IS_FETCHING } from "../action";

const initialState: UsersState = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
};

const profileReducer = (state = initialState, action: any) => {
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

    default:
      return state;
  }
};

export const follow = (userId: string) => ({
  type: FOLLOW,
  payload: userId,
});
export const unfollow = (userId: string) => ({
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

export default profileReducer;
