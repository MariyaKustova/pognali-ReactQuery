import React from "react";
import classNames from "classnames";

import s from "./Pagination.module.scss";

const Pagination = (props: any) => {
  const { totalCount, count, currentPage, onClick, className } = props;

  const pagesTotalCount = Math.ceil(totalCount / count);
  let pages = [];
  for (let i = 1; i <= 10; i++) {
    pages.push(i);
  }

  return (
    <div className={s.Pagination}>
      {pages.map((pageItem) => (
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
    </div>
  );
};

export default Pagination;
