import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import Button from "../../components/common/Button/Button";
import IconUser from "../../assets/images/user-icon.svg";
import { ROUTE_PATH } from "../../constants";
import { User } from "./types";
import { usersAPI } from "../../redux/API/users";
import { ResponseDataBase } from "../Login/types";

import s from "./UserItem.module.scss";

interface UserItemProps extends User {
  queryKey:  (string | number)[],
  setError: (error: Error) => void, 
}

const UserItem: FC<UserItemProps> = ({
  id,
  name,
  photos,
  location,
  status,
  followed,
  queryKey,
  setError,
}) => {
  const queryClient = useQueryClient();

  const followMutation = useMutation<
  ResponseDataBase<{}> | undefined,
  Error,
  number
>((userId: number) => usersAPI.follow(userId), {
    onSuccess: (data, variables) => {
      if (data?.resultCode === 0) {
        queryClient.invalidateQueries(queryKey);
      } else {
        throw new Error(data?.messages[0]);
      }
    },
    onError: (error) => {
      setError(error);
    },
  });

  const unfollowMutation = useMutation<
  ResponseDataBase<{}> | undefined,
  Error,
  number
>((userId: number) => usersAPI.unfollow(userId), {
    onSuccess: (data, variables) => {
      if (data?.resultCode === 0) {
        queryClient.invalidateQueries(queryKey);
      } else {
        throw new Error(data?.messages[0]);
      }
    },
    onError: (error) => {
      setError(error);
    },
  })

  return (
    <div className={s.UserItem}>
      <NavLink className={s.UserItem__Link} to={`${ROUTE_PATH.PROFILE}/${id}`}>
        <div className={s.UserItem__ShortInfo}>
          <div className={s.UserItem__Wrapper}>
            <img
              className={s.UserItem__Img}
              src={photos.small ?? IconUser}
              alt="User's avatar"
            />

            {followed ? (
              <Button
                className={s.UserItem__Button}
                label={"Unfollow"}
                disabled={unfollowMutation.isLoading}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  unfollowMutation.mutate(id);
                }}
              />
            ) : (
              <Button
                className={s.UserItem__Button}
                label={"Follow"}
                disabled={followMutation.isLoading}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  followMutation.mutate(id);
                }}
              />
            )}
          </div>
          <div>
            <h3 className={s.UserItem__Name}>{name}</h3>
            <p className={s.UserItem__Text}>
              {status ?? "The status will appear here very soon"}
            </p>
          </div>
        </div>
        <div className={s.UserItem__Location}>
          <p className={s.UserItem__Text}>
            {location?.country ?? "Country not specified"}
          </p>
          <p className={s.UserItem__Text}>
            {location?.city ?? "The city is not specified"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default UserItem;
