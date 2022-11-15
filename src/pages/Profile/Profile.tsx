import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useParams } from "react-router-dom";

import { ProfileFormValues, UserProfile } from "./types";
import MyPosts from "./MyPosts/MyPosts";
import IconUser from "../../assets/images/user-icon.svg";
import IconEdit from "../../assets/images/edit-icon.svg";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import ProfileInfoForm from "./components/ProfileInfoForm/ProfileInfoForm";
import Loader from "../../components/common/Loader/Loader";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";
import { ResponseDataBase, ResponseMe } from "../Login/types";
import { profileAPI } from "../../redux/API/profile";
import { ROUTE_PATH } from "../../constants";

import s from "./Profile.module.scss";

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();
  const queryClient = useQueryClient();
  const currentUserId =
    queryClient.getQueryData<ResponseDataBase<ResponseMe>>("auth")?.data.id;

  const userId: number | undefined = Number(params.userId) || currentUserId;

  const { data: userProfile } = useQuery<UserProfile | undefined, Error>({
    queryKey: ["profile", userId],
    queryFn: () => profileAPI.getProfile(userId),
    enabled: !!userId,
    onError: (err) => {
      setError(error);
    },
  });

  const mutatePhoto = useMutation<
    ResponseDataBase<{}> | undefined,
    Error,
    File
  >((photo: File) => profileAPI.savePhoto(photo), {
    onSuccess: (data) => {
      if (data?.resultCode === 0) {
        queryClient.invalidateQueries(["profile", userId]);
      } else {
        throw new Error(data?.messages[0]);
      }
    },
    onError: (error) => {
      setError(error);
    },
  });

  const mutateProfile = useMutation<
    ResponseDataBase<{}> | undefined,
    Error,
    ProfileFormValues
  >((values: ProfileFormValues) => profileAPI.saveProfile(values), {
    onSuccess: (data) => {
      if (data?.resultCode === 0) {
        queryClient.invalidateQueries(["profile", userId]);
      } else {
        throw new Error(data?.messages[0]);
      }
    },
    onError: (error) => {
      setError(error);
    },
  });

  const isOwner = useMemo(
    () => userProfile?.userId === currentUserId,
    [userProfile, currentUserId]
  );

  const onPhotoDownload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        mutatePhoto.mutate(e.currentTarget.files[0]);
      }
    },
    [mutatePhoto]
  );

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      mutateProfile.mutate(values);
      setEditMode(false);
    },
    [mutateProfile]
  );

  if (!userId) return <Navigate to={ROUTE_PATH.MAIN} />;

  return (
    <>
      {!!error && (
        <ErrorAlert message={error.message} resetError={() => setError(null)} />
      )}
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
            <ProfileInfoForm
              onSubmit={onSubmit}
              {...userProfile}
              errorMessage={mutateProfile.error?.message}
            />
          ) : (
            <>
              <ProfileInfo {...userProfile} setError={setError} />
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
