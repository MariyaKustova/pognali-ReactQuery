import React, { FC } from "react";

import s from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={s.ErrorMessage}>
      {message}
    </div>
  );
};

export default ErrorMessage;
