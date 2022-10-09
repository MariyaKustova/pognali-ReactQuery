import React, { FC, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import s from "./Pagination.module.scss";

interface PaginationProps {
  totalCount: number;
  count: number;
  currentPage: number;
  onClick: (page: number) => void;
  className?: string;
  maxPagesCount?: number;
}

const Pagination: FC<PaginationProps> = ({
  totalCount,
  count,
  currentPage,
  onClick,
  className,
  maxPagesCount: portionSize = 10,
}) => {
  const pagesTotalCount = Math.ceil(totalCount / count);
  let pages = [];
  for (let i = 1; i <= pagesTotalCount; i++) {
    pages.push(i);
  }
  const pagesPortionCount = Math.ceil(pagesTotalCount / portionSize);
  
  const [portionNumber, setPortionNumber] = useState<number>(1);
  
  const leftPortionPageNumber = useMemo(
    () => (portionNumber - 1) * portionSize + 1,
    [portionNumber, portionSize]
  );
  const rightPortionPageNumber = useMemo(
    () => portionNumber * portionSize,
    [portionNumber, portionSize]
  );

  useEffect(() => {
    onClick(leftPortionPageNumber);
  }, [leftPortionPageNumber])


  const onClickBack = () => {
    setPortionNumber(portionNumber - 1);
  };

  const onClickNext = () => {
    setPortionNumber(portionNumber + 1);
  };

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
            onClick={() => onClick(pageItem)}
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
