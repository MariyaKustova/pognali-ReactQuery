import React from "react";
import { connect } from "react-redux";

import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import withRouterComponent from "../../helpers/withRouterComponent";
import { ProfileFormValues, RouterProps, UserProfile } from "./types";
import {
  getProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
} from "../../redux/thunkCreators";
import { ROUTE_PATH } from "../../constants";
import { getCurrentUser } from "../../redux/selectors.ts/authSelectors";
import {
  getProfileStatus,
  getUserProfile,
} from "../../redux/selectors.ts/profileSelectors";
import { getErrorMessages } from "../../redux/selectors.ts/securitySelectors";
import { State } from "../../redux/reduxStore";

interface ProfileContainerProps {
  userProfile: UserProfile;
  status: string;
  currentUser: UserProfile;
  errorMessages: string[];
  getProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (values: ProfileFormValues) => void;
  router: RouterProps;
}

class ProfileContainer extends React.Component<ProfileContainerProps> {
  refreshProfile = () => {
    const userId: string | number =
      this.props.router.params.userId || this.props.currentUser?.userId;
      
    if (userId) {
      this.props.getProfile(Number(userId));
      this.props.getUserStatus(Number(userId));
    } else {
      this.props.router.navigate(ROUTE_PATH.MAIN);
    }
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: ProfileContainerProps) {
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
      this.refreshProfile();
    }
  }

  render(): JSX.Element {
    if (!this.props.userProfile) {
      return <Loader />;
    }

    return (
      <Profile
        {...this.props.userProfile}
        isOwner= {!!this.props.currentUser}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
        status={this.props.status}
        errorMessages={this.props.errorMessages}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

const mapStateToProps = (state: State) => ({
  userProfile: getUserProfile(state),
  status: getProfileStatus(state),
  currentUser: getCurrentUser(state),
  errorMessages: getErrorMessages(state),
});

export default connect(mapStateToProps, {
  getProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
})(withRouterComponent(ProfileContainer));
