import React from "react";

import s from './InWorkPage.module.scss';

const InWorkPage = () => {
  return (
    <div className={s.InWorkPage}>
      <h1 className={s.InWorkPage__Title}>
        На данный момент эта страница находится в разработке. Приносим свои
        извинения!
      </h1>
    </div>
  );
};

export default InWorkPage;
