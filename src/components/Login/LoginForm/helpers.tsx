import { Control, Controller } from "react-hook-form";

import BaseInput from "../../common/BaseInput/BaseInput";
import { FieldNames } from "./constants";

export const createController = (
  name: FieldNames.LOGIN | FieldNames.PASSWORD | FieldNames.CAPTCHA,
  control: Control<
    {
      login: string;
      password: string;
      rememberMe: boolean;
      captcha: string;
    },
    any
  >,
  props?: { [key: string]: string }
) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <BaseInput {...field} {...fieldState} {...props} />
    )}
  />
);
