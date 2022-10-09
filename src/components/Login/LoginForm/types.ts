import { FieldNames } from "./constants";

export interface LoginFormValues {
  [FieldNames.LOGIN]: string;
  [FieldNames.PASSWORD]: string;
  [FieldNames.REMEMBER_ME]: boolean;
  [FieldNames.CAPTCHA]?: string;
}
