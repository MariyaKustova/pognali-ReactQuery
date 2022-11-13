import React, { FC, useEffect, useState } from "react";

import s from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
  message: string;
  resetError?: () => void;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ message, resetError }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      resetError && resetError();
    }, 3000);
  }, []);

  return open ? <div className={s.ErrorAlert}>{message}</div> : null;
};

export default ErrorAlert;
