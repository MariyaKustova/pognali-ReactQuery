import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, State } from "../../../../redux/reduxStore";
import { getProfileStatus } from "../../../../redux/selectors.ts/profileSelectors";
import { updateUserStatus } from "../../../../redux/slices/profileSlice";
import BaseInput from "../../../../components/common/BaseInput/BaseInput";

import s from "./ProfileStatus.module.scss";

const ProfileStatus = () => {
  const status = useSelector((state: State) => getProfileStatus(state));
  const dispatch = useDispatch<AppDispatch>();

  const [userStatus, setUserStatus] = useState<string>(status);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setUserStatus(status);
  }, [status]);

  const onToggleEditMode = () => {  
    setEditMode((prevState) => !prevState);
  };

  const onChangeStatus = () => {
    dispatch(updateUserStatus(userStatus));
    onToggleEditMode();
  };

  return (
    <div className={s.ProfileStatus}>
      {editMode ? (
        <div className={s.ProfileStatus__Modal}>
          <span className={s.ProfileStatus__Hint}>Введите ваш статус</span>
          <BaseInput
            value={userStatus}
            onBlur={onChangeStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className={s.ProfileStatus__input}
          />
        </div>
      ) : (
        <div onClick={onToggleEditMode}>
          {status || "Установите ваш статус"}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
