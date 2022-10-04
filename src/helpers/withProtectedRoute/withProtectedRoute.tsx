import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { getIsAuth } from "../../redux/selectors.ts/authSelectors";

interface ProtectedRouteProps {
  isAuth: boolean;
}

export const withProtectedRoute = (Component: any) => {
  class ProtectedRoute extends React.Component<ProtectedRouteProps> {
    render() {
      if (!this.props.isAuth) return <Navigate to={ROUTE_PATH.LOGIN} />;
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: any) => ({
    isAuth: getIsAuth(state),
  });
  
  return connect(mapStateToProps, {})(ProtectedRoute);
};


