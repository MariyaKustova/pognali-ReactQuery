import React from "react";
import { connect } from "react-redux";

import {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalCountPages,
  toggleIsFetching,
} from "../../redux/reducers/usersReducer";
import { UsersContainerProps } from "./types";
import axios from "axios";
import Users from "./Users";
import Loader from "../common/Loader/Loader";

const PAGE_SIZE = 5;

class UsersContainer extends React.Component<UsersContainerProps> {
  componentDidMount(): void {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${PAGE_SIZE}`
      )
      .then((response: any) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
      });
  }

  changeCurrentPage = (newPage: number) => {
    this.props.setCurrentPage(newPage);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${PAGE_SIZE}`
      )
      .then((response: any) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalCountPages(response.data.totalCount);
      });
  };

  render(): JSX.Element {
    return (
      <>
        {this.props.isFetching ? (
          <Loader />
        ) : (
          <Users
            totalCount={this.props.totalCount}
            currentPage={this.props.currentPage}
            changeCurrentPage={this.changeCurrentPage}
            users={this.props.users}
            pageSize={PAGE_SIZE}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.usersPage.users,
  totalCount: state.usersPage.totalCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   follow: (userId: string) => dispatch(follow(userId)),
//   unfollow: (userId: string) => dispatch(unfollow(userId)),
//   setUsers: (users: any) => dispatch(setUsers(users)),
//   setTotalCountPages: (totalCount: number) =>
//     dispatch(setTotalCountPages(totalCount)),
//   setCurrentPage: (currentPage: number) =>
//     dispatch(setCurrentPage(currentPage)),
//   toggleIsFetching: (isFetching: boolean) =>
//     dispatch(toggleIsFetching(isFetching)),
// });

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setTotalCountPages,
  setCurrentPage,
  toggleIsFetching,
})(UsersContainer);
