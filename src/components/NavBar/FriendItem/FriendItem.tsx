import React from "react";

import s from "./FriendItem.module.scss";

const FriendItem = (props: any) => {
  return (
    <div>
      <span className={s.FriendItem__name}>{props.name}</span>
    </div>
  );
};

export default FriendItem;
