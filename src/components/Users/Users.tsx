import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../common/Pagination/Pagination";
import { getUsers } from "../../redux/slices/usersSlice";
import { User } from "./types";
import Loader from "../common/Loader/Loader";
import UserItem from "./UserItem";
import {
  getCurrentPage,
  getIsFetching,
  getUsersInfo,
} from "../../redux/selectors.ts/usersSelectors";
import { AppDispatch, State } from "../../redux/reduxStore";

const PAGE_SIZE = 5;

const Users = () => {
  const users = useSelector((state: State) => getUsersInfo(state));
  const currentPage = useSelector((state: State) => getCurrentPage(state));
  const isFetching = useSelector((state: State) => getIsFetching(state));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize: PAGE_SIZE }));
  }, []);

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize: PAGE_SIZE }));
  }, [dispatch, currentPage]);

  return (
    <>
      <Pagination count={PAGE_SIZE} />
      {isFetching ? (
        <Loader />
      ) : (
        users.map((user: User) => <UserItem key={user.id} {...user} />)
      )}
    </>
  );
};

export default Users;
