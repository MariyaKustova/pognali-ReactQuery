import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATH } from "../../constants";
import IconUser from "../../assets/images/user-icon.svg";
import { getCurrentUser, getIsAuth } from "../../redux/selectors.ts/authSelectors";
import { logoutUser } from "../../redux/slices/securitySlice";
import { AppDispatch } from "../../redux/reduxStore";

import s from "./Header.module.scss";

const Header = () => {
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch<AppDispatch>();

  const onClick = () => {
    dispatch(logoutUser());
  }

  return (
    <header className={s.Header}>
      <div className={s.Header__Wrapper}>
        <Link to={ROUTE_PATH.MAIN}>
          <picture className={s.Header__DarkTheme}>
            <source
              type="image/webp"
              media="(min-width: 1440px)"
              srcSet="
              ./img/webp/logo-desktop-white@1x.webp 1x,
              ./img/webp/logo-desktop-white@2x.webp 2x
            "
            />
            <source
              type="image/webp"
              media="(min-width: 768px)"
              srcSet="
              ./img/webp/logo-tablet-white@1x.webp 1x,
              ./img/webp/logo-tablet-white@2x.webp 2x
            "
            />
            <source
              type="image/webp"
              media="(min-width: 320px)"
              srcSet="
              ./img/webp/logo-mobile-white@1x.webp 1x,
              ./img/webp/logo-mobile-white@2x.webp 2x
            "
            />
            <source
              media="(min-width: 1440px)"
              srcSet="
              ./img/content/logo-desktop-white@1x.png 1x,
              ./img/content/logo-desktop-white@2x.png 2x
            "
            />
            <source
              media="(min-width: 768px)"
              srcSet="
              ./img/content/logo-tablet-white@1x.png 1x,
              ./img/content/logo-tablet-white@2x.png 2x
            "
            />
            <img
              className={s.Header__Logo}
              src="./img/content/logo-mobile-white@1x.png"
              srcSet="./img/content/logo-mobile-white@2x.png 2x"
              loading="lazy"
              alt="Логотип"
            />
          </picture>
        </Link>
        <div className={s.Header__rightContent}>
          {isAuth ? (
            <>
              <button
                className={s.Header__btnLogout}
                onClick={onClick}
              >
                Log out
              </button>
              <Link to={`${ROUTE_PATH.PROFILE}`}>
                <div className={s.Header__Login}>
                  <img
                    className={s.Header__Img}
                    src={currentUser?.photos.small ?? IconUser}
                    alt="Аватар пользователя"
                  />
                  <span className={s.Header__Text}>
                    {currentUser?.fullName}
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <Link to={ROUTE_PATH.LOGIN}>Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
