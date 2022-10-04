import { SET_NEW_MESSAGE } from "../action";

export interface DialogsState {
  dialogsData: { id: string, name: string }[];
  messagesData: { id: string, message: string }[];
}

const initialState: DialogsState = {
  dialogsData: [
    {
      id: "1",
      name: "Dima",
    },
    {
      id: "2",
      name: "Anna",
    },
    {
      id: "3",
      name: "Sveta",
    },
    {
      id: "4",
      name: "Ann",
    },
    {
      id: "5",
      name: "Alex",
    },
    {
      id: "6",
      name: "Antony",
    },
  ],
  messagesData: [
    {
      id: "1",
      message: "Hi!",
    },
    {
      id: "2",
      message: "WOW",
    },
    {
      id: "3",
      message: "Hi!!!",
    },
    {
      id: "4",
      message: "Hello!",
    },
    {
      id: "5",
      message: "Good morning!",
    },
    {
      id: "6",
      message: "Rrrr...",
    },
  ],
};

const dialogsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_MESSAGE: {
      const newMessage = {
        id: "7",
        message: action.payload,
      };

      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      };
    }

    default:
      return state;
  }
};

export const setNewMessage = (newMessage: string) => ({
  type: SET_NEW_MESSAGE,
  payload: newMessage,
});

export default dialogsReducer;
