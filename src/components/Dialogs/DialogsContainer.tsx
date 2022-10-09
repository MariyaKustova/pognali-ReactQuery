import { connect } from "react-redux";
import { compose } from "redux";

import Dialogs from "./Dialogs";
import { setNewMessage } from "../../redux/reducers/dialogsReducer";
import { withProtectedRoute } from "../../helpers/withProtectedRoute/withProtectedRoute";
import { getDialogsData, getMessagesData } from "../../redux/selectors.ts/dialogsSelectors";
import { State } from "../../redux/reduxStore";

const mapStateToProps = (state: State) => ({
  dialogsData: getDialogsData(state),
  messagesData: getMessagesData(state),
});

export default compose(
  connect(mapStateToProps, {
    setNewMessage,
  }),
  withProtectedRoute
)(Dialogs);
