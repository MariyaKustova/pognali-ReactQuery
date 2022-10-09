import { State } from "../reduxStore";

export const getProfileStatus = (state: State) => state.profile.status;

export const getUserProfile = (state: State) => state.profile.userProfile;

export const getPostsData = (state: State) => state.profile.postsData;