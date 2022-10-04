import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Header from "./Header";
import { logoutUser } from "../../redux/thunkCreators";
import { UserProfile } from "../Profile/types";
import {
  getCurrentUser,
  getIsAuth,
} from "../../redux/selectors.ts/authSelectors";

interface HeaderContainerProps {
  isAuth: boolean;
  currentUser: UserProfile;
  logoutUser: () => void;
}

class HeaderContainer extends React.Component<HeaderContainerProps> {
  render(): JSX.Element {
    return (
      <Header
        isAuth={this.props.isAuth}
        currentUser={this.props.currentUser}
        logout={this.props.logoutUser}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuth: getIsAuth(state),
  currentUser: getCurrentUser(state),
});

export default compose(
  connect(mapStateToProps, {
    logoutUser,
  })
)(HeaderContainer);
