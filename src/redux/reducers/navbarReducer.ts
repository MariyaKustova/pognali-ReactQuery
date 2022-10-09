import { Friend } from "../../components/NavBar/types";
import { User } from "../../components/Users/types";
import { SET_FRIENDS } from "../action";

export interface NavbarState {
  friends: Friend[];
}

const initialState: NavbarState = {
  friends: [],
};

const navbarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FRIENDS:   {   
    return {
        ...state,
        friends: action.payload.filter((friend: User) => !Boolean(friend.followed)).splice(0, 3),
      };
    }
    default:
      return state;
  }
};

// ActionCreator

export const setFriends = (friends: User[]) => ({
  type: SET_FRIENDS,
  payload: friends,
});

export default navbarReducer;
