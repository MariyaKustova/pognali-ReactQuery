import { AxiosResponse } from "axios";
import { instanceAxios } from "./constants";

export const securityAPI = {
  getCaptchaUrl() {
    return instanceAxios.get("security/get-captcha-url").then((response: AxiosResponse<any, any>) => response.data);
  },
};
