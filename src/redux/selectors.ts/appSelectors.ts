import { State } from "../reduxStore";

export const getInitialized = (state: State) => state.app.initialized;
export const getErrorsMessage = (state: State) => state.app.errors;