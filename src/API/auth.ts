import { requestLoginData, ResponseData, ResponseEmptyData } from "../components/Login/types";
import { instanceAxios } from "./constants";

export const authAPI = {
  auth() {
    return instanceAxios.get("auth/me").then((response: any) => response.data);
  },
  login(requestData: requestLoginData) {
    return instanceAxios.post("auth/login", requestData).then((response: ResponseData) => response.data);
  },
  logout() {
    return instanceAxios.delete("auth/login").then((response: ResponseEmptyData) => response.data);
  },
};
