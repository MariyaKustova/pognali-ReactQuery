import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../components/common/Pagination/Pagination";
import { getUsers } from "../../redux/slices/usersSlice";
import { User } from "./types";
import Loader from "../../components/common/Loader/Loader";
import UserItem from "./UserItem";
import { getUsersState } from "../../redux/selectors.ts/usersSelectors";
import { AppDispatch, State } from "../../redux/reduxStore";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

const PAGE_SIZE = 5;

const Users = () => {
  const {
    users,
    currentPage,
    error: usersError,
  } = useSelector((state: State) => getUsersState(state));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize: PAGE_SIZE }));
  }, []);

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize: PAGE_SIZE }));
  }, [dispatch, currentPage]);

  return (
    <>
      {!users.length ? (
        <Loader />
      ) : (
        <>
          {usersError && <ErrorAlert message={usersError} />}
          <Pagination count={PAGE_SIZE} />
          {users.map((user: User) => (
            <UserItem key={user.id} {...user} />
          ))}
        </>
      )}
    </>
  );
};

export default Users;
