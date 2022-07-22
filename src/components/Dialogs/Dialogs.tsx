import React from "react";

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import TextArea from "../TextArea/TextArea";

import s from "./Dialogs.module.scss";

const Dialogs = (props: any) => {
  const { dialogsData, messagesData, newMessage, addMessage, updateMessage } = props;

  const onAddMessage = () => {
    addMessage();
  };

  const onChangeMessage = (e: any) => {
    const message = e.target.value;
    updateMessage(message);
  };

  return (
    <div className={s.Dialogs}>
      <div className={s.Dialogs__Wrapper}>
        <ul className={s.Dialogs__List}>
          {dialogsData.map((dialog: any, index: any) => (
            <DialogItem key={index} path={dialog.id} content={dialog.name} />
          ))}
        </ul>
        <div>
          <ul className={s.Dialogs__List}>
            {messagesData.map((message: any, index: any) => (
              <MessageItem key={index} message={message.message} />
            ))}
          </ul>
          <TextArea
            onChange={onChangeMessage}
            value={newMessage}
            onClick={onAddMessage}
            placeholder="Add new message"
          />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
