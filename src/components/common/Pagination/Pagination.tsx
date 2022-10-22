import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { AppDispatch, State } from "../../../redux/reduxStore";
import {
  getCurrentPage,
  getTotalCount,
} from "../../../redux/selectors.ts/usersSelectors";
import { setCurrentPage } from "../../../redux/slices/usersSlice";

import s from "./Pagination.module.scss";

interface PaginationProps {
  count: number;
  className?: string;
  maxPagesCount?: number;
}

const Pagination: FC<PaginationProps> = ({
  count,
  className,
  maxPagesCount: portionSize = 10,
}) => {
  const totalCount = useSelector((state: State) => getTotalCount(state));
  const currentPage = useSelector((state: State) => getCurrentPage(state));

  const dispatch = useDispatch<AppDispatch>();

  const pagesTotalCount = Math.ceil(totalCount / count);
  let pages = [];
  for (let i = 1; i <= pagesTotalCount; i++) {
    pages.push(i);
  }
  const pagesPortionCount = useMemo(
    () => Math.ceil(pagesTotalCount / portionSize),
    [pagesTotalCount, portionSize]
  );

  const [portionNumber, setPortionNumber] = useState<number>(1);

  const leftPortionPageNumber = useMemo(
    () => (portionNumber - 1) * portionSize + 1,
    [portionNumber, portionSize]
  );
  const rightPortionPageNumber = useMemo(
    () => portionNumber * portionSize,
    [portionNumber, portionSize]
  );

  const changeCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(setCurrentPage(newPage));
    },
    [dispatch]
  );

  useEffect(() => {
    changeCurrentPage(leftPortionPageNumber);
  }, [leftPortionPageNumber, changeCurrentPage]);

  const onClickBack = useCallback(() => {
    setPortionNumber(portionNumber - 1);
  }, [portionNumber]);

  const onClickNext = useCallback(() => {
    setPortionNumber(portionNumber + 1);
  }, [portionNumber]);

  return (
    <div className={s.Pagination}>
      {portionNumber > 1 && (
        <button
          onClick={onClickBack}
          className={classNames(s.Pagination__Button, s.Pagination__ButtonBack)}
        />
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((pageItem) => (
          <span
            key={pageItem}
            className={classNames(s.Pagination__PageItem, className, {
              [s.Pagination__PageItemActive]: currentPage === pageItem,
            })}
            onClick={() => changeCurrentPage(pageItem)}
          >
            {pageItem}
          </span>
        ))}
      {portionNumber < pagesPortionCount && (
        <button
          onClick={onClickNext}
          className={classNames(s.Pagination__Button, s.Pagination__ButtonNext)}
        />
      )}
    </div>
  );
};

export default Pagination;
