import React from "react";
import _ from "lodash";

import { UserProfile } from "./types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import SmartLink from "../common/SmartLink/SmartLink";

import s from "./Profile.module.scss";


const Profile = (props: UserProfile) => {
  return (
    <>
      {!_.isEmpty(props) && (
        <div className={s.Profile}>
          <img
            className={s.Profile__Photo}
            src={props.photos.large}
            alt="Фотография пользователя"
          />
          <div className={s.Profile__Wrapper}>
            <div className={s.Profile__Header}>
              <div className={s.Profile__ShortInfo}>
                <h2>{props.fullName || "Здесь будет имя пользователя"}</h2>
                <p>id: {props.userId || "-"}</p>
              </div>
              {props.lookingForAJob && (
                <div className={s.Profile__Job}>
                  <img
                    className={s.Profile__JobIcon}
                    src="https://img.icons8.com/fluency/344/find-matching-job.png"
                    alt="Иконка - активный поиск работы"
                  />
                  <p className={s.Profile__JobDescription}>
                    {props.lookingForAJobDescription}
                  </p>
                </div>
              )}
            </div>
            <div className={s.Profile__Info}>
              <div className={s.Profile__About}>
                <h4>Немного обо мне...</h4>
                <p>{props.aboutMe || "-"}</p>
              </div>
              <div className={s.Profile__Contacts}>
                <ul>
                  <li>
                    <SmartLink url={props.contacts.facebook}>Facebook</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.github}>Github</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.instagram}>Instagram</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.mainLink}>MainLink</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.twitter}>Twitter</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.vk}>VK</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.website}>WebSite</SmartLink>
                  </li>
                  <li>
                    <SmartLink url={props.contacts.youtube}>YouTube</SmartLink>
                  </li>
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
