import { SET_NEW_POST, SET_USER_PROFILE, SET_USER_STATUS } from './../action';
import { Post, UserProfile } from "../../components/Profile/types";

export interface ProfileState {
  postsData: Post[];
  userProfile: UserProfile | null,
  status: string,
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
  status: '',
}

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_POST: {
      const newPost: Post = {
        id: '7',
        message: action.payload,
        countLikes: 17,
      };

      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
}

export const setNewPost = (newPost: string) => ({type: SET_NEW_POST, payload: newPost})
export const setUserProfile = (profile: UserProfile) => ({type: SET_USER_PROFILE, payload: profile})
export const setUserStatus = (status: string) => ({type: SET_USER_STATUS, payload: status})

export default profileReducer;
