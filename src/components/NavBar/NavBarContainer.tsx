import { connect } from "react-redux";
import NavBar from "./NavBar";

const mapStateToProps = (state: any) => ({
  state: state.navbar,
})

const NavBarContainer = connect(mapStateToProps)(NavBar);

export default NavBarContainer;
