export interface User {
  id: string,
  name: string,
  uniqueUrlName: string,
  status: string,
  photos: {
    small: string,
    large: string,
  },
  location: {
    country: string,
    city: string,
  },
  followed: boolean,
}

export interface UsersState {
  users: User[],
  totalCount: number,
  currentPage: number,
  isFetching: boolean,
}

export interface UsersContainerProps {
  users: User[],
  totalCount: number,
  currentPage: number,
  isFetching: boolean,
  setUsers: (users: User[]) => void,
  follow: (userId: string) => void,
  unfollow: (userId: string) => void,
  setTotalCountPages: (totalCount: number) => void,
  setCurrentPage: (currentPage: number) => void,
  toggleIsFetching: (isFetching: boolean) => void,
}
