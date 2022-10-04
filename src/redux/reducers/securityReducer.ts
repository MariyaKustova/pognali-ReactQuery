import { SET_CAPTCHA_URL, SET_ERROR_MESSAGE } from "../action";

export interface SecurityState {
  messages: string[],
  captcha: string | null,
}

const initialState: SecurityState = {
  messages: [],
  captcha: null,
};

const securityReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE: {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case SET_CAPTCHA_URL: {
      return {
        ...state,
        captcha: action.payload,
      };
    }

    default:
      return state;
  }
};

export const setErrorMessage = (messages: string[]) => ({
  type: SET_ERROR_MESSAGE,
  payload: messages,
});

export const setCapthaUrl = (captcha: string | null) => ({
  type: SET_CAPTCHA_URL,
  payload: captcha,
});

export default securityReducer;
