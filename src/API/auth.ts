import {
  requestLoginData,
  ResponseDataLogin,
  ResponseDataMe,
  ResponseDataLogout,
} from "../components/Login/types";
import { instanceAxios } from "./constants";

export const authAPI = {
  auth() {
    return instanceAxios
      .get("auth/me")
      .then((response: ResponseDataMe) => response.data);
  },
  login(requestData: requestLoginData) {
    return instanceAxios
      .post("auth/login", requestData)
      .then((response: ResponseDataLogin) => response.data);
  },
  logout() {
    return instanceAxios
      .delete("auth/login")
      .then((response: ResponseDataLogout) => response.data);
  },
};
