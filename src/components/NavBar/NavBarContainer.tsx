import { Component } from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reduxStore";
import { getNavbarFriends } from "../../redux/selectors.ts/navbarSelectors";
import { getFriends } from "../../redux/thunkCreators";
import NavBar from "./NavBar";
import { Friend } from "./types";

interface NavBarComponentProps {
  friends: Friend[];
  getFriends: () => void;
}

class NavBarComponent extends Component<NavBarComponentProps> {
  componentDidMount(): void {
    this.props.getFriends();
  }

  render() {
    return <NavBar friends={this.props.friends}/>
  }
}

const mapStateToProps = (state: State) => ({
  friends: getNavbarFriends(state),
})

const NavBarContainer = connect(mapStateToProps, {getFriends})(NavBarComponent);

export default NavBarContainer;
