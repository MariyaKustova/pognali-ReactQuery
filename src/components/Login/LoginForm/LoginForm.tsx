import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../common/Button/Button";
import Checkbox from "../../common/Checkbox/Checkbox";
import { FieldNames } from "./constants";
import { createController } from "./helpers";

import s from "./LoginForm.module.scss";

interface LoginFormProps {
  onSubmit: (values: any) => void;
  captcha: string;
}

const schema = yup
  .object({
    login: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm: FC<LoginFormProps> = ({ onSubmit, captcha }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      [FieldNames.LOGIN]: "",
      [FieldNames.PASSWORD]: "",
      [FieldNames.REMEMBER_ME]: false,
      [FieldNames.CAPTCHA]: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.LoginForm}>
      {createController(FieldNames.LOGIN, control)}
      {createController(FieldNames.PASSWORD, control, { type: "password" })}
      <Controller
        name={FieldNames.REMEMBER_ME}
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      {captcha && (
        <>
          <div className={s.LoginForm__captchaImg}>
            <img src={captcha} alt="Security text" />
          </div>
          {createController(FieldNames.CAPTCHA, control)}
        </>
      )}
      <div className={s.LoginForm__buttonWrapper}>
        <Button label="Login" type="submit" className={s.LoginForm__button} />
      </div>
    </form>
  );
};

export default LoginForm;
