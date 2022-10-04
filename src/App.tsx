import React, { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import NavBarContainer from "./components/NavBar/NavBarContainer";

import MainPage from "./components/MainPage/MainPage";
import HeaderComponent from "./components/Header/HeaderComponent";
import { HASH_STAR, ROUTE_PATH } from "./constants";
import { initApp } from "./redux/thunkCreators";
import Loader from "./components/common/Loader/Loader";
import withRouterComponent from "./helpers/withRouterComponent";
import { getInitialized } from "./redux/selectors.ts/appSelectors";

import s from "./App.module.scss";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

interface AppProps {
  initialized: boolean;
  initApp: () => void;
}

class App extends React.Component<AppProps> {
  componentDidMount(): void {
    this.props.initApp();
  }

  render() {
    return !this.props.initialized ? (
      <Loader />
    ) : (
      <Fragment>
        <HeaderComponent />
        <div className={s.App__Wrapper}>
          <NavBarContainer />
          <div className={s.App__Content}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path={ROUTE_PATH.MAIN} element={<MainPage />}></Route>
                <Route path={ROUTE_PATH.PROFILE} element={<ProfileContainer />}>
                  <Route
                    path={`${ROUTE_PATH.PROFILE}:userId`}
                    element={<ProfileContainer />}
                  />
                </Route>
                <Route
                  path={`${ROUTE_PATH.DIALOGS}${HASH_STAR}`}
                  element={<DialogsContainer />}
                ></Route>
                <Route
                  path={`${ROUTE_PATH.USERS}`}
                  element={<UsersContainer />}
                ></Route>
                <Route path={`${ROUTE_PATH.LOGIN}`} element={<Login />}></Route>
              </Routes>
            </Suspense>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  initialized: getInitialized(state),
});

export default compose(
  withRouterComponent,
  connect(mapStateToProps, { initApp })
)(App);
