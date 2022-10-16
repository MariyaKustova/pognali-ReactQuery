import { ProfileState } from "./profileSlice";
import { UsersState } from "./usersSlice";

type State = UsersState | ProfileState;

export const setSuccess = (state: State) => {
  state.isFetching = false;
  state.error = null;
};

export const setErrors = (state: State, errorMessage: string) => {
  state.isFetching = false;
  state.error = errorMessage;
};

export const setPending = (state: State) => {
  state.isFetching = true;
};