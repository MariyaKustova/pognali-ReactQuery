import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../reduxStore";
import { authUser } from "./authSlice";

export interface AppState {
  initialized: boolean;
  errors: string | null;
}

const initialState: AppState = {
  initialized: false,
  errors: null,
};

export const initApp = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "app/initApp",
  async function (_, { dispatch }) {
    const promise = dispatch(authUser());
    Promise.all([promise]).then(() => dispatch(appInitSuccess()));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appInitSuccess: (state) => {
      state.initialized = true;
    },
    setAppErrors: (state, action: PayloadAction<string | null>) => {
      state.errors = action.payload;
    },
  },
});

export const { appInitSuccess, setAppErrors } = appSlice.actions;

export default appSlice.reducer;
