import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextArea from "../../../../common/TextArea/TextArea";

interface PostFormProps {
  onSubmit: (values: { newPost: string }) => void;
}

const schema = yup
  .object({
    newPost: yup.string().max(1000, 'The message length cannot be more than 1000 characters').required(),
  })
  .required();

const PostForm: FC<PostFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPost: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={"newPost"}
        control={control}
        render={({ field, fieldState }) => {
          return <TextArea {...field} {...fieldState} />;
        }}
      />
    </form>
  );
};

export default PostForm;
