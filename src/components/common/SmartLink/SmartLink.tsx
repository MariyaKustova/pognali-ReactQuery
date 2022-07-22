import React from "react";
import { Link } from "react-router-dom";

const SmartLink = (props: any) => {
  return props.url ? <Link to={props.url}>{props.children}</Link> : null;
}

export default SmartLink;
