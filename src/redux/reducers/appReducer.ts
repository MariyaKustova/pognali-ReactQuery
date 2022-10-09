import { INIT_APP_SUCCESS, SET_APP_ERRORS } from "../action";


export interface AppState {
  initialized: boolean;
  errors: string | null;
}

const initialState: AppState = {
  initialized: false,
  errors: null,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_APP_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }

    case SET_APP_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      }
    }

    default:
      return state;
  }
};

// ActionCreator

export const appInitSuccess = () => ({
  type: INIT_APP_SUCCESS,
});

export const setAppErrors = (message: string) => ({
  type: SET_APP_ERRORS,
  payload: message
});

export default appReducer;
