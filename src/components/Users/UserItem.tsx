import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../common/Button/Button";
import IconUser from "../../assets/images/iconUser.svg";
import { ROUTE_PATH } from "../../constants";

import s from "./UserItem.module.scss";


const UserItem = (props: any) => {
  return (
    <div className={s.UserItem}>
      <NavLink to={`${ROUTE_PATH.PROFILE}/${props.id}`}>
        <div className={s.UserItem__ShortInfo}>
          <div className={s.UserItem__Wrapper}>
            <img
              className={s.UserItem__Img}
              src={props.photos.small ?? IconUser}
              alt="Аватар пользователя"
            />

            {props.followed ? (
              <Button
                className={s.UserItem__Button}
                label={"Follow"}
                onClick={() => props.unfollow(props.id)}
              />
            ) : (
              <Button
                className={s.UserItem__Button}
                label={"Unfollow"}
                onClick={() => props.follow(props.id)}
              />
            )}
          </div>
          <div>
            <h3 className={s.UserItem__Name}>{props.name}</h3>
            <p className={s.UserItem__Text}>
              {props.status ?? "Очень скоро здесь появится статус"}
            </p>
          </div>
        </div>
        <div className={s.UserItem__Location}>
          <p className={s.UserItem__Text}>
            {props.location?.country ?? "Страна не указана"}
          </p>
          <p className={s.UserItem__Text}>
            {props.location?.city ?? "Город не указан"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default UserItem;
