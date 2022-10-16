import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { routes } from "../../constants";
import FriendItem from "./FriendItem/FriendItem";
import { getNavbarFriends } from "../../redux/selectors.ts/navbarSelectors";
import { AppDispatch, State } from "../../redux/reduxStore";
import { getFriends } from "../../redux/slices/navbarSlice";

import s from "./NavBar.module.scss";

const NavBar = () => {
  const friends = useSelector((state: State) => getNavbarFriends(state));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFriends({}));
  }, []);

  return (
    <nav className={s.NavBar}>
      <ul>
        {routes.map((route) => (
          <li key={route.title}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.NavBar__ActiveLink : s.NavBar__Link
              }
              to={route.to}
            >
              {route.title}
            </NavLink>
          </li>
        ))}
        <li>
          <div className={s.NavBar__FriendsSection}>
            <div className={classnames(s.NavBar__Title, {
              [s.NavBar__TitleNotActive]: !friends.length,
            })}>Friends online</div>
            {friends.length ? (
              <div className={s.NavBar__Wrapper}>
                {friends.map((friend) => (
                  <FriendItem
                    key={friend.id}
                    id={friend.id}
                    name={friend.name}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
