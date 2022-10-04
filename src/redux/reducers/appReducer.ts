import { APP_INIT_SUCCESS } from "../action";

export interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case APP_INIT_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }

    default:
      return state;
  }
};

// ActionCreator

export const appInitSuccess = () => ({
  type: APP_INIT_SUCCESS,
});

export default appReducer;
