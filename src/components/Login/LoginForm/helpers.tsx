import { Control, Controller } from "react-hook-form";

import BaseInput from "../../common/BaseInput/BaseInput";

export const createController = (
  name: string,
  control: Control<any>,
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
