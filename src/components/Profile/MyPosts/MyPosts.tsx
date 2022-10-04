import React, { Fragment } from "react";
import Post from "./components/Post/Post";
import PostForm from "./components/PostForm/PostForm";

import s from "./MyPosts.module.scss";

const MyPosts = (props: any) => {
  const { posts, addPost } = props;

  const onSubmit = (values: {newPost: string}) => {    
    values.newPost.length && addPost(values.newPost);
  };

  return (
    <Fragment>
      <PostForm onSubmit={onSubmit} />
      <ul className={s.MyPosts}>
        {posts.map((post: any, index: any) => (
          <Post
            key={index}
            message={post.message}
            countLikes={post.countLikes}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default MyPosts;
