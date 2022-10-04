import { connect } from "react-redux";
import { getNavbarFriends } from "../../redux/selectors.ts/navbarSelectors";
import NavBar from "./NavBar";

const mapStateToProps = (state: any) => ({
  friends: getNavbarFriends(state),
})

const NavBarContainer = connect(mapStateToProps)(NavBar);

export default NavBarContainer;
