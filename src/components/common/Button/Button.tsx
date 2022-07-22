import React from "react";
import classnames from "classnames";

import s from './Button.module.scss';

const Button = (props: any) => {
  return (
    <button className={classnames(s.Button, props.className)} onClick={props.onClick}>{props.label}</button>
  )
}

export default Button;