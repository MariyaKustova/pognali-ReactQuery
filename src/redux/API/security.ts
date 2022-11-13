import { AxiosResponse } from "axios";
import { ResponseCaptcha } from "../../pages/Login/types";
import { instanceAxios } from "./constants";

export const securityAPI = {
  getCaptchaUrl(): Promise<ResponseCaptcha> {
    return instanceAxios.get("security/get-captcha-url").then((response: AxiosResponse<any, any>) => response.data);
  },
};
