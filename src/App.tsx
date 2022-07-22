import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import MainPage from "./components/MainPage/MainPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { HASH_STAR, ROUTE_PATH } from "./constants";

import s from "./App.module.scss";

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className={s.App__Wrapper}>
        <NavBarContainer />
        <div className={s.App__Content}>
          <Routes>
            <Route
              path={ROUTE_PATH.MAIN}
              element={<MainPage />}
            ></Route>
            <Route
              path={`${ROUTE_PATH.PROFILE}${HASH_STAR}`}
              element={<ProfileContainer />}
            ></Route>
            <Route
              path={`${ROUTE_PATH.DIALOGS}${HASH_STAR}`}
              element={<DialogsContainer />}
            ></Route>
            <Route
              path={`${ROUTE_PATH.USERS}`}
              element={<UsersContainer />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
