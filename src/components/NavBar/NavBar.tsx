import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import FriendItem from "./FriendItem/FriendItem";
import { Friend } from "./types";

import s from "./NavBar.module.scss";

interface NavBarProps {
  friends: Friend[];
}

const NavBar: FC<NavBarProps> = ({friends}) => {
  return (
    <nav className={s.NavBar}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.PROFILE}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.DIALOGS}
          >
            Dialogs
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.USERS}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.NEWS}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.MUSIC}
          >
            Music
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.NavBar__ActiveLink : s.NavBar__Link
            }
            to={ROUTE_PATH.SETTINGS}
          >
            Settings
          </NavLink>
        </li>
        <li>
          <div className={s.NavBar__Link}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.NavBar__ActiveLink : s.NavBar__Link
              }
              to={ROUTE_PATH.FRIENDS}
            >
              Friends
            </NavLink>
            <div className={s.NavBar__Wrapper}>
              {friends.map((friend) => (
                <FriendItem key={friend.id} name={friend.name} />
              ))}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
