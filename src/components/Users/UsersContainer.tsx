import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Pagination from "../common/Pagination/Pagination";
import { setCurrentPage } from "../../redux/reducers/usersReducer";
import { User } from "./types";
import Loader from "../common/Loader/Loader";
import { getUsers, follow, unfollow } from "../../redux/thunkCreators";
import UserItem from "./UserItem";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getTotalCount,
  getUsersInfo,
} from "../../redux/selectors.ts/usersSelectors";
import { State } from "../../redux/reduxStore";

const PAGE_SIZE = 5;

interface UsersContainerProps {
  users: User[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  setCurrentPage: (currentPage: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (currentPage: number, PAGE_SIZE: number) => void;
}

class UsersContainer extends React.Component<UsersContainerProps> {
  componentDidMount(): void {
    this.props.getUsers(this.props.currentPage, PAGE_SIZE);
  }

  componentDidUpdate(prevProps: UsersContainerProps): void {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.getUsers(this.props.currentPage, PAGE_SIZE);
    }
  }

  changeCurrentPage = (newPage: number) => {
    this.props.setCurrentPage(newPage);
  };

  render(): JSX.Element {
    return (
      <>
        <Pagination
          totalCount={this.props.totalCount}
          count={PAGE_SIZE}
          currentPage={this.props.currentPage}
          onClick={this.changeCurrentPage}
        />
        {this.props.isFetching ? (
          <Loader />
        ) : (
          this.props.users.map((user: User) => (
            <UserItem
              key={user.id}
              user={user}
              follow={this.props.follow}
              unfollow={this.props.unfollow}
              followingInProgress={this.props.followingInProgress}
            />
          ))
        )}
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({
  users: getUsersInfo(state),
  totalCount: getTotalCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state),
});

export default compose(
  connect(mapStateToProps, {
    setCurrentPage,
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);
