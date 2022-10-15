import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../common/Button/Button";
import IconUser from "../../assets/images/user-icon.svg";
import { ROUTE_PATH } from "../../constants";
import { User } from "./types";
import { AppDispatch, State } from "../../redux/reduxStore";
import { getFollowingInProgress } from "../../redux/selectors.ts/usersSelectors";
import { follow, unfollow } from "../../redux/slices/usersSlice";

import s from "./UserItem.module.scss";

const UserItem: FC<User> = ({ id, name, photos, location, status, followed }) => {
  const followingInProgress = useSelector((state: State) =>
    getFollowingInProgress(state)
  );
  const dispatch = useDispatch<AppDispatch>();

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
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  dispatch(unfollow(id));
                }}
              />
            ) : (
              <Button
                className={s.UserItem__Button}
                label={"Follow"}
                disabled={followingInProgress.some((userId) => userId === id)}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  dispatch(follow(id));
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
