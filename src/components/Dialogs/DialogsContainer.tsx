import { connect } from "react-redux";

import Dialogs from "./Dialogs";
import {
  setNewMessageActionCreator,
  updateMessageTextActionCreator,
} from "../../redux/reducers/dialogsReducer";


const mapStateToProps = (state: any) => ({
  dialogsData: state.dialogs.dialogsData,
  messagesData: state.dialogs.messagesData,
  newMessage: state.dialogs.newMessage,
})

const mapDispatchToProps = (dispatch: any) => ({
  addMessage: () => dispatch(setNewMessageActionCreator()),
  updateMessage: (message: string) => dispatch(updateMessageTextActionCreator(message)),
})

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
