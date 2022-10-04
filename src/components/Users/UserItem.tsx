import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import Button from "../common/Button/Button";
import IconUser from "../../assets/images/user-icon.svg";
import { ROUTE_PATH } from "../../constants";
import { User } from "./types";

import s from "./UserItem.module.scss";

interface UserItemProps {
  user: User;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: number[];
}

const UserItem: FC<UserItemProps> = ({
  user,
  follow,
  unfollow,
  followingInProgress,
}) => {
  const { id, name, photos, location, status, followed } = user;

  return (
    <div className={s.UserItem}>
      <NavLink className={s.UserItem__Link} to={`${ROUTE_PATH.PROFILE}/${id}`}>
        <div className={s.UserItem__ShortInfo}>
          <div className={s.UserItem__Wrapper}>
            <img
              className={s.UserItem__Img}
              src={photos.small ?? IconUser}
              alt="Аватар пользователя"
            />

            {followed ? (
              <Button
                className={s.UserItem__Button}
                label={"Unfollow"}
                disabled={followingInProgress.some((userId) => userId === id)}
                onClick={(e: any) => {
                  e.preventDefault();
                  unfollow(id);
                }}
              />
            ) : (
              <Button
                className={s.UserItem__Button}
                label={"Follow"}
                disabled={followingInProgress.some((userId) => userId === id)}
                onClick={(e: any) => {
                  e.preventDefault();
                  follow(id);
                }}
              />
            )}
          </div>
          <div>
            <h3 className={s.UserItem__Name}>{name}</h3>
            <p className={s.UserItem__Text}>
              {status ?? "Очень скоро здесь появится статус"}
            </p>
          </div>
        </div>
        <div className={s.UserItem__Location}>
          <p className={s.UserItem__Text}>
            {location?.country ?? "Страна не указана"}
          </p>
          <p className={s.UserItem__Text}>
            {location?.city ?? "Город не указан"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default UserItem;
