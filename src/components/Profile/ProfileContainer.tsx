import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { ProfileContainerProps } from "./types";
import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import { setUserProfile } from "../../redux/reducers/profileReducer";

class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount(): void {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/1069`
      )
      .then((response) => this.props.setUserProfile(response.data));
  }

  render(): JSX.Element {
    if (!this.props.userProfile)  {<Loader />}

    return (<Profile {...this.props.userProfile} />)    
  }
}

const mapStateToProps = (state: any) => ({
  userProfile: state.profile.userProfile,
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
