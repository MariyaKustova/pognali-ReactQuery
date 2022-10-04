import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextArea from "../../../common/TextArea/TextArea";

interface DialogFormProps {
  onSubmit: (values: { newMessage: string }) => void;
}


const schema = yup
  .object({
    newMessage: yup.string().max(300, 'The message length cannot be more than 300 characters').required(),
  })
  .required();

const DialogForm: FC<DialogFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newMessage: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={"newMessage"}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextArea
              {...field}
              {...fieldState}
              label="Add message"
              placeholder="Add new message"
            />
          );
        }}
      />
    </form>
  );
};

export default DialogForm;
