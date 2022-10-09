import { State } from './../reduxStore';

export const getErrorMessages = (state: State) => state.security.messages;

export const getCaptcha = (state: State) => state.security.captcha;