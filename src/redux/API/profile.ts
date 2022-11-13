import { ResponseDataBase } from "../../pages/Login/types";
import { ProfileFormValues, UserProfile } from "../../pages/Profile/types";
import { instanceAxios } from "./constants";

export const profileAPI = {
  getProfile(userId: number | undefined): Promise<UserProfile> | undefined {
    if (userId) {
      return instanceAxios
        .get(`profile/${userId}`)
        .then((response) => response.data);
    }
  },
  getStatus(userId: number): Promise<string> {
    return instanceAxios
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status: string): Promise<ResponseDataBase<{}>> {
    return instanceAxios.put(`profile/status`, { status });
  },
  savePhoto(photo: File): Promise<ResponseDataBase<{}>> {
    const formData = new FormData();
    formData.append("image", photo);

    return instanceAxios
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileFormValues): Promise<ResponseDataBase<{}>> {
    return instanceAxios
      .put(`profile`, profile)
      .then((response) => response.data);
  },
};
