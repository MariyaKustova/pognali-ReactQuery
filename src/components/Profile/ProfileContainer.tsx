import React from "react";
import { connect } from "react-redux";

import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import withRouterComponent from "../../helpers/withRouterComponent";
import { RouterProps, UserProfile } from "./types";
import {
  getProfile,
  getUserStatus,
  updateUserStatus,
} from "../../redux/thunkCreators";
import { ROUTE_PATH } from "../../constants";
import { getCurrentUser } from "../../redux/selectors.ts/authSelectors";
import { getProfileStatus, getUserProfile } from "../../redux/selectors.ts/profileSelectors";

interface ProfileContainerProps {
  userProfile: UserProfile;
  status: string;
  currentUser: UserProfile;
  getProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  router: RouterProps;
}

class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount() {
    const userId: string | number = this.props.router.params.userId  || this.props.currentUser?.userId;
    if (userId) {
      this.props.getProfile(Number(userId));
      this.props.getUserStatus(Number(userId));
    } else {
      this.props.router.navigate(ROUTE_PATH.MAIN)
    }
  }

  render(): JSX.Element {
    if (!this.props.userProfile) {
      return <Loader />;
    }

    return (
      <Profile
        {...this.props.userProfile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  userProfile: getUserProfile(state),
  status: getProfileStatus(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, {
  getProfile,
  getUserStatus,
  updateUserStatus,
})(withRouterComponent(ProfileContainer));
