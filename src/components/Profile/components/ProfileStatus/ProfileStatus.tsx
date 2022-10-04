import React, { FC, useEffect, useState } from "react";
import BaseInput from "../../../common/BaseInput/BaseInput";

import s from "./ProfileStatus.module.scss";

interface ProfileStatusProps {
  status: string;
  updateUserStatus: (status: string) => void;
}

const ProfileStatus: FC<ProfileStatusProps> = ({
  status,
  updateUserStatus,
}) => {
  const [userStatus, setUserStatus] = useState<string>(status);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setUserStatus(status);
  }, [status]);

  const onToggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const onChangeStatus = () => {
    updateUserStatus(userStatus);
    onToggleEditMode();
  };

  return (
    <div className={s.ProfileStatus}>
      {editMode ? (
        <div className={s.ProfileStatus__Modal}>
          <span className={s.ProfileStatus__Hint}>Введите ваш статус</span>
          <BaseInput
            value={status}
            onBlur={onChangeStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className={s.ProfileStatus__input}
          />
        </div>
      ) : (
        <span onClick={onToggleEditMode}>
          {status || "Установите ваш статус"}
        </span>
      )}
    </div>
  );
};

export default ProfileStatus;
