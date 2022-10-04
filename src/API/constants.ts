import axios from "axios";

export const instanceAxios = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "19997782-d465-4301-8df7-198699b4772a" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});
