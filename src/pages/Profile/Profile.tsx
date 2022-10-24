import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ProfileFormValues } from "./types";
import MyPosts from "./MyPosts/MyPosts";
import IconUser from "../../assets/images/user-icon.svg";
import IconEdit from "../../assets/images/edit-icon.svg";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import ProfileInfoForm from "./components/ProfileInfoForm/ProfileInfoForm";
import { AppDispatch, State } from "../../redux/reduxStore";
import { getCurrentUser } from "../../redux/selectors.ts/authSelectors";
import { getProfileState } from "../../redux/selectors.ts/profileSelectors";
import {
  getProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
} from "../../redux/slices/profileSlice";
import Loader from "../../components/common/Loader/Loader";
import { ROUTE_PATH } from "../../constants";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

import s from "./Profile.module.scss";

const Profile = () => {
  const { userProfile, error: profileError } = useSelector((state: State) =>
    getProfileState(state)
  );

  const currentUser = useSelector((state: State) => getCurrentUser(state));
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const navigate = useNavigate();

  const isOwner = useMemo(
    () => userProfile?.userId === currentUser?.userId,
    [userProfile, currentUser]
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const refreshProfile = useCallback(() => {
    const userId: string | number | undefined =
      params.userId || currentUser?.userId;

    if (userId) {
      dispatch(getProfile(+userId));
      dispatch(getUserStatus(+userId));
    } else {
      navigate(ROUTE_PATH.MAIN);
    }
  }, [dispatch, navigate, params.userId, currentUser]);

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [params.userId, refreshProfile]);

  const onPhotoDownload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) dispatch(savePhoto(e.currentTarget.files[0]));
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      dispatch(saveProfile(values));
      setEditMode(false);
    },
    [dispatch]
  );

  return (
    <>
      {profileError && <ErrorAlert message={profileError} />}
      {userProfile ? (
        <div className={s.Profile}>
          <div className={s.Profile__WrapperPhoto}>
            <img
              className={s.Profile__Photo}
              src={userProfile?.photos.large || IconUser}
              alt="Фотография пользователя"
            />
            {isOwner && (
              <div className={s.Profile__WrapperInput}>
                <label className={s.Profile__Label}>
                  Выберите файл
                  <input
                    className={s.Profile__InputFile}
                    type="file"
                    onChange={onPhotoDownload}
                  />
                </label>
              </div>
            )}
          </div>
          {editMode ? (
            <ProfileInfoForm onSubmit={onSubmit} {...userProfile} />
          ) : (
            <>
              <ProfileInfo {...userProfile} />
              {isOwner && (
                <div className={s.Profile__EditWrapper}>
                  <button
                    className={s.Profile__ButtonEdit}
                    onClick={() => setEditMode(true)}
                  >
                    <img
                      className={s.Profile__IconEdit}
                      src={IconEdit}
                      alt="Редактирование профиля"
                    />
                  </button>
                  <div className={s.Profile__Tooltip}>Editing profile</div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <MyPosts />
    </>
  );
};

export default Profile;
