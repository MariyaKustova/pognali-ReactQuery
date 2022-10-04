import { connect } from "react-redux";

import MyPosts from "./MyPosts";
import { setNewPost } from "../../../redux/reducers/profileReducer";
import { getPostsData } from "../../../redux/selectors.ts/profileSelectors";

const mapStateToProps = (state: any) => ({
  posts: getPostsData(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  addPost: (newPost: string) => dispatch(setNewPost(newPost)),
});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
