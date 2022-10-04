import React, { FC } from "react";

import DialogItem from "./components/DialogItem/DialogItem";
import MessageItem from "./components/MessageItem/MessageItem";
import { Dialog, Message } from "./types";
import DialogForm from "./components/DialogForm/DialogForm";

import s from "./Dialogs.module.scss";

interface DialogsProps {
  dialogsData: Dialog[];
  messagesData: Message[];
  setNewMessage: (newMessage: string) => void;
}

const Dialogs: FC<DialogsProps> = ({
  dialogsData,
  messagesData,
  setNewMessage,
}) => {
  const onSubmit = (values: {newMessage: string}) => {
    values.newMessage.length && setNewMessage(values.newMessage);
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
        </div>
      </div>
      <DialogForm onSubmit={onSubmit} />
    </div>
  );
};

export default Dialogs;
