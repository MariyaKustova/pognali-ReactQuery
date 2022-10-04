import React, { FC } from "react";

import s from "./FriendItem.module.scss";

interface FriendItemProps {
  name: string;
}

const FriendItem: FC<FriendItemProps> = ({ name }) => {
  return (
    <div>
      <span className={s.FriendItem__name}>{name}</span>
    </div>
  );
};

export default FriendItem;
