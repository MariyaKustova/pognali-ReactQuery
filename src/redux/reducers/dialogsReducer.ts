import { SET_NEW_MESSAGE, UPDATE_MESSAGE_TEXT } from "../action";

const initialState = {
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
  newMessage: "",
};

const dialogsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_MESSAGE: {
      const newMessage = {
        id: "7",
        message: state.newMessage,
      };

      return { 
        ...state,
        messagesData: [...state.messagesData, newMessage],
        newMessage: "",
      };
    }

    case UPDATE_MESSAGE_TEXT: {
      return { 
        ...state,
        newMessage: action.payload,
      };
    }
    
    default:      
      return state;
  }
};

export const setNewMessageActionCreator = () => ({ type: SET_NEW_MESSAGE });
export const updateMessageTextActionCreator = (text: string) => ({
  type: UPDATE_MESSAGE_TEXT,
  payload: text,
});

export default dialogsReducer;
