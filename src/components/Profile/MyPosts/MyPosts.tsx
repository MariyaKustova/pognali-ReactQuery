import React, { FC, Fragment } from "react";
import PostItem from "./components/PostItem/PostItem";
import PostForm from "./components/PostForm/PostForm";
import { Post } from "../types";

import s from "./MyPosts.module.scss";

interface MyPostsProps {
  posts: Post[];
  addPost: (newPost: string) => void;
}

const MyPosts: FC<MyPostsProps> = ({ posts, addPost }) => {
  const onSubmit = (values: { newPost: string }) => {
    values.newPost.length && addPost(values.newPost);
  };

  return (
    <Fragment>
      <PostForm onSubmit={onSubmit} />
      <ul className={s.MyPosts}>
        {posts.map((post: Post, index: number) => (
          <PostItem
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
