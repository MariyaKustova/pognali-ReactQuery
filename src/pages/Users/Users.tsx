import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "@mui/material/Pagination";

//import Pagination from "../../components/common/Pagination/Pagination";
import { User, UsersResponse } from "./types";
import Loader from "../../components/common/Loader/Loader";
import UserItem from "./UserItem";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";
import { usersAPI } from "../../redux/API/users";

import s from "./UserItem.module.scss";

const PAGE_SIZE = 5;
export const FIRST_PAGE = 1;

const styles = {
  color: "#192144",
  ".MuiButtonBase-root": {
    backgroundColor: "#ffd74b",
  },
  ".MuiPaginationItem-ellipsis": {
    color: "#ffd74b",
  },
  ".MuiButtonBase-root.Mui-selected": {
    backgroundColor: "#ff8d30",
    color: "#192144",
  },
  ".MuiButtonBase-root.Mui-selected.MuiButtonBase-root:hover": {
    backgroundColor: "#ffbd30",
  },
  ".MuiButtonBase-root:hover": {
    backgroundColor: "#ffbd30",
  },
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [error, setError] = useState<Error | null>(null);

  const queryKey = ["users", currentPage, PAGE_SIZE];

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery<UsersResponse, Error>({
    queryKey,
    queryFn: () => usersAPI.getUsers(currentPage, PAGE_SIZE),
    onError: (error) => setError(error),
    keepPreviousData: true,
  });

  const changeCurrentPage = useCallback(
    (e: React.ChangeEvent<unknown>, newPage: number) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!!error && (
            <ErrorAlert
              message={error.message}
              resetError={() => setError(null)}
            />
          )}
          <div className={s.UserItem__WrapperPagination}>
            <Pagination
              count={data?.totalCount}
              color="secondary"
              size="medium"
              showFirstButton
              onChange={changeCurrentPage}
              defaultPage={currentPage}
              sx={styles}
            />
          </div>
          {isFetching && <div className={s.UserItem__Fetching}>Fetching...</div>}
          {data?.items.length ? (
            data?.items.map((user: User) => (
              <UserItem setError={setError} key={user.id} {...user} queryKey={queryKey} />
            ))
          ) : (
            <div className={s.UserItem__MessageWrapper}>
              <div className={s.UserItem__Message}>
                Unfortunately, no users have been found!
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
