import { instanceAxios } from "./constants";

export const profileAPI = {
  getProfile(userId: number) {
    return instanceAxios.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instanceAxios.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instanceAxios.put(`profile/status`, {status}).then((response) => response.data);
  },
};
