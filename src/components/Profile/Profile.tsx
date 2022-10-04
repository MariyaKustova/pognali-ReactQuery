import React, { FC } from "react";
import _ from "lodash";

import { ProfileProps } from "./types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import SmartLink from "../common/SmartImgLink/SmartImgLink";
import ProfileStatus from "./components/ProfileStatus/ProfileStatus";
import { getIcon } from "./helpers";
import IconUser from "../../assets/images/user-icon.svg";

import s from "./Profile.module.scss";

const Profile: FC<ProfileProps> = (props) => {
  const {
    userId,
    aboutMe,
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    contacts,
    photos,
    status,
    updateUserStatus,
  } = props;

  return (
    <>
      {!_.isEmpty(props) && (
        <div className={s.Profile}>
          <img
            className={s.Profile__Photo}
            src={photos.large || IconUser}
            alt="Фотография пользователя"
          />
          <div className={s.Profile__Wrapper}>
            <div className={s.Profile__Header}>
              <div className={s.Profile__ShortInfo}>
                <h2>{fullName || "Здесь будет имя пользователя"}</h2>
                <p>id: {userId || "-"}</p>
                <ProfileStatus
                  status={status}
                  updateUserStatus={updateUserStatus}
                />
              </div>
              {lookingForAJob && (
                <div className={s.Profile__Job}>
                  <img
                    className={s.Profile__JobIcon}
                    src="https://img.icons8.com/fluency/344/find-matching-job.png"
                    alt="Иконка - активный поиск работы"
                  />
                  <p className={s.Profile__JobDescription}>
                    {lookingForAJobDescription}
                  </p>
                </div>
              )}
            </div>
            <div className={s.Profile__Info}>
              <div className={s.Profile__About}>
                <h4>Немного обо мне...</h4>
                <p>{aboutMe || "-"}</p>
              </div>
              <div className={s.Profile__Contacts}>
                <ul>
                  {Object.entries(contacts).map(([key, value]) => (
                    <li key={key}>
                      <SmartLink
                        url={value}
                        title={key.toUpperCase()}
                        src={getIcon(key)}
                        alt={`Иконка ${key}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <MyPostsContainer />
    </>
  );
};

export default Profile;
