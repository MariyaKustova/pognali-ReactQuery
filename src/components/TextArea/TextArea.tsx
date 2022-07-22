import React, { Fragment } from "react";

const TextArea = (props: any) => {
  const {onClick, value, onChange} = props;

  return (
    <Fragment>
      <textarea value={value} onChange={onChange} placeholder={props.placeholder} />
      <button onClick={onClick}>Add post</button>
    </Fragment>
  );
};

export default TextArea;
