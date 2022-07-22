import { connect } from "react-redux";

import MyPosts from "./MyPosts";
import {
  setNewPostActionCreator,
  updatePostTextActionCreator,
} from "../../../redux/reducers/profileReducer";


const mapStateToProps = (state: any) => ({
  posts: state.profile.postsData,
  newPostText: state.profile.newPostText
})

const mapDispatchToProps = (dispatch: any) => ({
  addPost: () => dispatch(setNewPostActionCreator()),
  updatePostText: (text: string) => dispatch(updatePostTextActionCreator(text)),
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
