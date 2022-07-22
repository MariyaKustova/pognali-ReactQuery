import React from "react";

import s from './MessageItem.module.scss';


const MessageItem = (props: any) => {
  const {message} = props;
  return (
    <li className={s.MessageItem}>{message}</li>
  );
};

export default MessageItem;
