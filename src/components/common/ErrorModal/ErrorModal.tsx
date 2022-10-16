import React, { FC } from "react";

import s from "./ErrorModal.module.scss";

interface ErrorModalProps {
  message: string;
  onClick?: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ message, onClick }) => {
  return (
    <div className={s.ErrorModal} onClick={onClick}>
      <div className={s.ErrorModal__Modal}>
        <h1>Error!</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
