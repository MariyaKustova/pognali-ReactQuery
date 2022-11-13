import {
  requestLoginData,
  ResponseDataLogin,
  ResponseDataMe,
  ResponseDataLogout,
  ResponseDataBase,
  ResponseMe,
  ResponseLogin,
  ResponseLogout,
} from "../../pages/Login/types";
import { instanceAxios } from "./constants";

export const authAPI = {
  auth(): Promise<ResponseDataBase<ResponseMe>> {
    return instanceAxios
      .get("auth/me")
      .then((response: ResponseDataMe) => response.data);
  },
  login(requestData: requestLoginData): Promise<ResponseDataBase<ResponseLogin>> {
    return instanceAxios
      .post("auth/login", requestData)
      .then((response: ResponseDataLogin) => response.data);
  },
  logout(): Promise<ResponseDataBase<ResponseLogout>> {
    return instanceAxios
      .delete("auth/login")
      .then((response: ResponseDataLogout) => response.data);
  },
};
