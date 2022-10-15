import React, { Fragment, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import MainPage from "./components/MainPage/MainPage";
import { HASH_STAR, ROUTE_PATH } from "./constants";
import Loader from "./components/common/Loader/Loader";
import {
  getErrorsMessage,
  getInitialized,
} from "./redux/selectors.ts/appSelectors";
import Header from "./components/Header/Header";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";
import NotFound from "./NotFound/NotFound";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import { initApp, setAppErrors } from "./redux/slices/appSlice";
import { AppDispatch, State } from "./redux/reduxStore";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

import s from "./App.module.scss";

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));
const Users = React.lazy(() => import("./components/Users/Users"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Login = React.lazy(() => import("./components/Login/Login"));

const App = () => {
  const initialized = useSelector((state: State) => getInitialized(state));
  const errorsMessage = useSelector((state: State) => getErrorsMessage(state));
  const dispatch = useDispatch<AppDispatch>();

  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    dispatch(setAppErrors(e.reason.message));
  };

  useEffect(() => {
    dispatch(initApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return window.removeEventListener(
      "unhandledrejection",
      catchAllUnhandledErrors
    );
  }, [])

  const hideModal = () => {
    dispatch(setAppErrors(null));
  };

  
    return !initialized ? (
      <Loader />
    ) : (
      <Fragment>
        <Header />
        <div className={s.App__Wrapper}>
          <NavBar />
          <div className={s.App__Content}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
                <Route path={ROUTE_PATH.PROFILE} element={<Profile />}>
                  <Route
                    path={`${ROUTE_PATH.PROFILE}:userId`}
                    element={<Profile />}
                  />
                </Route>
                <Route
                  path={`${ROUTE_PATH.DIALOGS}${HASH_STAR}`}
                  element={
                    <ProtectedRoute>
                      <Dialogs />
                    </ProtectedRoute>
                  }
                />
                <Route path={`${ROUTE_PATH.USERS}`} element={<Users />} />
                <Route path={`${ROUTE_PATH.NEWS}`} element={<News />} />
                <Route path={`${ROUTE_PATH.MUSIC}`} element={<Music />} />
                <Route
                  path={`${ROUTE_PATH.SETTINGS}`}
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path={`${ROUTE_PATH.LOGIN}`} element={<Login />} />
                <Route path={`*`} element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        {errorsMessage && (
          <ErrorModal
            message={errorsMessage}
            onClick={hideModal}
          />
        )}
      </Fragment>
    );
  }
export default App;
