import { useQueryClient } from "react-query";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { ResponseDataBase, ResponseMe } from "../../pages/Login/types";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const queryClient = useQueryClient();
  const isAuth = !!queryClient.getQueryData<ResponseDataBase<ResponseMe>>("auth")?.data.id;

  return (!isAuth) ? <Navigate to={ROUTE_PATH.LOGIN} /> : children;
};
