import React, { FC, useEffect, useState } from "react";

import s from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ message }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, []);

  return open ? <div className={s.ErrorAlert}>{message}</div> : null;
};

export default ErrorAlert;
