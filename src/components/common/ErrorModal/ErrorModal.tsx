import React, { FC, useCallback, useState } from "react";

import s from "./ErrorModal.module.scss";

interface ErrorModalProps {
  message: string | undefined;
  isOpen: boolean;
  onClick?: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ message, isOpen, onClick }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const hideModal = useCallback(() => {
    setOpen(false);
    onClick && onClick();
  }, [onClick]);

  return (
    <>
      {open && message ? (
        <div className={s.ErrorModal} onClick={hideModal}>
          <div className={s.ErrorModal__Modal}>
            <h1>Error!</h1>
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorModal;
