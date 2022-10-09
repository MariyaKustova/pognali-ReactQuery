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
import {
  getErrorsMessage,
  getInitialized,
} from "./redux/selectors.ts/appSelectors";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";
import NotFound from "./NotFound/NotFound";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import { setAppErrors } from "./redux/reducers/appReducer";
import { State } from "./redux/reduxStore";

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
  errorsMessage: string;
  setAppErrors: (message: string | null) => void;
}

class App extends React.Component<AppProps> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log(e);
    
    this.props.setAppErrors(e.reason.message);
  };

  componentDidMount(): void {
    this.props.initApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount(): void {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  hideModal = () => {
    this.props.setAppErrors(null);
  };

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
                <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
                <Route path={ROUTE_PATH.PROFILE} element={<ProfileContainer />}>
                  <Route
                    path={`${ROUTE_PATH.PROFILE}:userId`}
                    element={<ProfileContainer />}
                  />
                </Route>
                <Route
                  path={`${ROUTE_PATH.DIALOGS}${HASH_STAR}`}
                  element={<DialogsContainer />}
                />
                <Route
                  path={`${ROUTE_PATH.USERS}`}
                  element={<UsersContainer />}
                />
                <Route path={`${ROUTE_PATH.NEWS}`} element={<News />} />
                <Route path={`${ROUTE_PATH.MUSIC}`} element={<Music />} />
                <Route path={`${ROUTE_PATH.SETTINGS}`} element={<Settings />} />
                <Route path={`${ROUTE_PATH.LOGIN}`} element={<Login />} />
                <Route path={`*`} element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        {this.props.errorsMessage && (
          <ErrorModal
            message={this.props.errorsMessage}
            onClick={this.hideModal}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: State) => ({
  initialized: getInitialized(state),
  errorsMessage: getErrorsMessage(state),
});

export default compose(
  withRouterComponent,
  connect(mapStateToProps, { initApp, setAppErrors })
)(App);
