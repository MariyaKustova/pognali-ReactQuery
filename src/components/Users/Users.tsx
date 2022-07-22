import React, { Fragment } from "react";

import UserItem from "./UserItem";
import Pagination from "../common/Pagination/Pagination";

import s from "./Users.module.scss";

const Users = (props: any) => {
  const {
    totalCount,
    pageSize,
    currentPage,
    changeCurrentPage,
    users,
    follow,
    unfollow,
  } = props;
  return (
    <Fragment>
      <Pagination
        totalCount={totalCount}
        count={pageSize}
        currentPage={currentPage}
        onClick={changeCurrentPage}
        className={s.Users__Pagination}
      />
      {users.map((user: any) => (
        <UserItem
          key={user.id}
          id={user.id}
          photos={user.photos}
          name={user.name}
          status={user.status}
          location={user.location}
          followed={user.followed}
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </Fragment>
  );
};

export default Users;
