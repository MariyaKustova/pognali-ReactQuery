import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import s from './Loader.module.scss';

const Loader = (props: any) => {
  return (
    <div className={s.Loader}>
      <CircularProgress color='warning' size={props.size || 60}/>
    </div>
  );
};

export default Loader;
