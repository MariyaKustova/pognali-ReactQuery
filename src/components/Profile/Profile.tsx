import React, { FC, useState } from "react";
import _ from "lodash";

import { ProfileFormValues, ProfileProps } from "./types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import IconUser from "../../assets/images/user-icon.svg";
import IconEdit from "../../assets/images/edit-icon.svg";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import ProfileInfoForm from "./components/ProfileInfoForm/ProfileInfoForm";

import s from "./Profile.module.scss";

const Profile: FC<ProfileProps> = (props) => {
  const { photos, isOwner, savePhoto, saveProfile, ...rest } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const onPhotoDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) savePhoto(e.currentTarget.files[0]);
  };

  const onSubmit = (values: ProfileFormValues) => {
    saveProfile(values);
    setEditMode(false);
  };

  return (
    <>
      {!_.isEmpty(props) && (
        <div className={s.Profile}>
          <div className={s.Profile__WrapperPhoto}>
            <img
              className={s.Profile__Photo}
              src={photos.large || IconUser}
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
            <ProfileInfoForm onSubmit={onSubmit} {...rest} />
          ) : (
            <>
              <ProfileInfo {...rest} />
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
      )}
      <MyPostsContainer />
    </>
  );
};

export default Profile;
