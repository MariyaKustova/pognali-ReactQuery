import { ResponseDataBase } from "../../pages/Login/types";
import { UsersResponse } from "../../pages/Users/types";
import { instanceAxios } from "./constants";

export const usersAPI = {
  getUsers(
    currentPage: number = 1,
    pageSize: number = 5
  ): Promise<UsersResponse> {
    return instanceAxios
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number): Promise<ResponseDataBase<{}>> {
    return instanceAxios.post(`follow/${id}`).then((response) => response.data);
  },
  unfollow(id: number): Promise<ResponseDataBase<{}>> {
    return instanceAxios
      .delete(`follow/${id}`)
      .then((response) => response.data);
  },
};
