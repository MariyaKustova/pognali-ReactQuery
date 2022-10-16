import { State } from "../reduxStore";

export const getProfileStatus = (state: State) => state.profile.status;

export const getPostsData = (state: State) => state.profile.postsData;

export const getProfileState = (state: State) => state.profile;
