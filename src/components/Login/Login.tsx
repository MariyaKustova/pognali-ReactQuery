import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { generateKey } from "../../helpers/utils";
import { getIsAuth } from "../../redux/selectors.ts/authSelectors";
import { getCaptcha, getErrorMessages } from "../../redux/selectors.ts/securitySelectors";
import { loginUser } from "../../redux/thunkCreators";
import ErrorMessage from "../common/ErrorMessage/ErrorMessage";
import LoginForm from "./LoginForm/LoginForm";
import { requestLoginData } from "./types";

interface LoginProps {
  isAuth: boolean,
  errorMessages: string[];
  captcha: string;
  loginUser: (values: requestLoginData) => void;
}


class Login extends React.Component<LoginProps> {
  onSubmit = (values: any) => {
    const  { login, password, rememberMe, captcha } = values;
    this.props.loginUser({email: login, password, rememberMe, captcha })
  };

  render(): JSX.Element {
    if (this.props.isAuth) return <Navigate to={ROUTE_PATH.MAIN} />;
    return (
      <>
        <h1>Login</h1>
        {this.props.errorMessages.map((message) => <ErrorMessage key={generateKey(message)} message={message} />)}
        <LoginForm onSubmit={this.onSubmit} captcha={this.props.captcha}/>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuth: getIsAuth(state),
  errorMessages: getErrorMessages(state),
  captcha: getCaptcha(state),
});

export default connect(mapStateToProps, { loginUser })(Login);
