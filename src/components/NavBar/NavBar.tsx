import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import classnames from "classnames";

import { routes } from "../../constants";
import FriendItem from "./FriendItem/FriendItem";

import s from "./NavBar.module.scss";
import { User, UsersResponse } from "../../pages/Users/types";
import { usersAPI } from "../../redux/API/users";
import { FIRST_PAGE } from "../../pages/Users/Users";

const PAGE_SIZE = 10;

const NavBar = () => {


  const getFriendsThree = (items: User[] | undefined) => {
    return items ? items.filter((friend: User) => !Boolean(friend.followed))
  .splice(0, 3): undefined};
  
  const { data } = useQuery<UsersResponse>({
    queryKey: ["friends"],
    queryFn: () => usersAPI.getUsers(FIRST_PAGE, PAGE_SIZE),    
  });

  const friends = getFriendsThree(data?.items);

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
            <div
              className={classnames(s.NavBar__Title, {
                [s.NavBar__TitleNotActive]: !friends?.length,
              })}
            >
              Friends online
            </div>
            {friends?.length ? (
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
