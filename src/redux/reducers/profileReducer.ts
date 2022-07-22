import { UserProfile } from "../../components/Profile/types";
import { SET_NEW_POST, SET_USER_PROFILE, UPDATE_POST_TEXT } from "../action";

const initialState = {
  newPostText: "NewPost",
  postsData: [
    {
      id: "1",
      message: "Hi, how are you?",
      countLikes: "12",
    },
    {
      id: "2",
      message: "It is second post!",
      countLikes: "18",
    },
    {
      id: "3",
      message: "Hi, how are you?",
      countLikes: "2",
    },
    {
      id: "4",
      message: "It is second post!",
      countLikes: "19",
    },
    {
      id: "5",
      message: "Hi, how are you?",
      countLikes: "34",
    },
    {
      id: "6",
      message: "It is second post!",
      countLikes: "45",
    },
  ],
  userProfile: null,
}

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_POST: {
      const newPost = {
        id: "7",
        message: state.newPostText,
        countLikes: "17",
      };

      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    }
    case UPDATE_POST_TEXT: {
      return {
        ...state,
        newPostText: action.payload,
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }

    default:
      return state;
  }
}

export const setNewPostActionCreator = () => ({type: SET_NEW_POST})
export const updatePostTextActionCreator = (text: string) => ({type: UPDATE_POST_TEXT, payload: text})
export const setUserProfile = (profile: UserProfile) => ({type: SET_USER_PROFILE, payload: profile})

export default profileReducer;
