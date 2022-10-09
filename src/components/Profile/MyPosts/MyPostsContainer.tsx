import { connect } from "react-redux";

import MyPosts from "./MyPosts";
import { setNewPost } from "../../../redux/reducers/profileReducer";
import { getPostsData } from "../../../redux/selectors.ts/profileSelectors";
import { State } from "../../../redux/reduxStore";

const mapStateToProps = (state: State) => ({
  posts: getPostsData(state),
});

const MyPostsContainer = connect(mapStateToProps, {setNewPost})(MyPosts);

export default MyPostsContainer;
