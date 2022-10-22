import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { AppDispatch, State } from "../../../../redux/reduxStore";
import { getProfileState } from "../../../../redux/selectors.ts/profileSelectors";
import { updateUserStatus } from "../../../../redux/slices/profileSlice";
import BaseInput from "../../../../components/common/BaseInput/BaseInput";
import { getCurrentUser } from "../../../../redux/selectors.ts/authSelectors";

import s from "./ProfileStatus.module.scss";

const ProfileStatus = () => {
  const currentUser = useSelector((state: State) => getCurrentUser(state));
  const { status, userProfile } = useSelector((state: State) =>
    getProfileState(state)
  );
  const dispatch = useDispatch<AppDispatch>();

  const [userStatus, setUserStatus] = useState<string>(status);
  const [editMode, setEditMode] = useState<boolean>(false);

  const isOwner = useMemo(
    () => userProfile?.userId === currentUser?.userId,
    [userProfile, currentUser]
  );

  useEffect(() => {
    setUserStatus(status);
  }, [status]);

  const onToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  const onChangeStatus = useCallback(() => {
    dispatch(updateUserStatus(userStatus));
    onToggleEditMode();
  }, [dispatch, onToggleEditMode, userStatus]);

  return (
    <div
      className={classnames(s.ProfileStatus, {
        [s.ProfileStatus__Owner]: isOwner,
      })}
    >
      {editMode && isOwner ? (
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
