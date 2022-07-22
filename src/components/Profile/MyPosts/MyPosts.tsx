import React, { Fragment } from "react";
import Post from "./Post/Post";
import TextArea from "../../TextArea/TextArea";

import s from "./MyPosts.module.scss";

const MyPosts = (props: any) => {  
  const { posts, newPostText, addPost, updatePostText } = props;
  
  const onAddPost = () => {
    addPost();
  };

  const onChange = (e: any) => {
    const text = e.target.value;
    updatePostText(text);
  }
  
  return (
    <Fragment>      
      <img src="" alt="" />
      <TextArea onChange={onChange} onClick={onAddPost} value={newPostText} />
      <ul className={s.MyPosts}>
        {posts.map((post: any, index: any) => <Post key={index} message={post.message} countLikes={post.countLikes}/>)}
      </ul>
    </Fragment>
  );
};

export default MyPosts;
