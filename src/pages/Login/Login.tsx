import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { generateKey } from "../../utils";
import { AppDispatch, State } from "../../redux/reduxStore";
import { getIsAuth } from "../../redux/selectors.ts/authSelectors";
import {
  getCaptcha,
  getErrorMessages,
} from "../../redux/selectors.ts/securitySelectors";
import { loginUser } from "../../redux/slices/securitySlice";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import LoginForm from "./LoginForm/LoginForm";
import { LoginFormValues } from "./LoginForm/types";

const Login: () => JSX.Element = () => {
  const isAuth = useSelector((state: State) => getIsAuth(state));
  const captcha = useSelector((state: State) => getCaptcha(state));
  const errorMessages = useSelector((state: State) => getErrorMessages(state));
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      const { login, password, rememberMe, captcha } = values;
      dispatch(loginUser({ email: login, password, rememberMe, captcha }));
    },
    [dispatch]
  );

  if (isAuth) return <Navigate to={ROUTE_PATH.MAIN} />;

  return (
    <>
      <h1>Login</h1>
      {errorMessages &&
        errorMessages.map((message) => (
          <ErrorMessage key={generateKey(message)} message={message} />
        ))}
      <LoginForm onSubmit={onSubmit} captcha={captcha} />
    </>
  );
};

export default Login;
