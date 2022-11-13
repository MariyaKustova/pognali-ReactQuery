import { FC, useCallback, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { generateKey } from "../../utils";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import LoginForm from "./LoginForm/LoginForm";
import { LoginFormValues } from "./LoginForm/types";
import { authAPI } from "../../redux/API/auth";
import { ResponseDataBase, ResponseLogin, ResponseMe } from "./types";
import { securityAPI } from "../../redux/API/security";

const Login: FC<{refetchAuth: () => void}> = ({refetchAuth}) => {
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const queryClient = new QueryClient();

  const isAuth =
    !!queryClient.getQueryData<ResponseDataBase<ResponseMe>>("auth")?.data.id;

  const captchaQuery = useQuery<{ url: string }, Error>(
    ["captcha"],
    securityAPI.getCaptchaUrl,
    {
      enabled: false,
      onError: (error) => {
        setError(error);
      },
    }
  );

  const loginMutation = useMutation<
    ResponseDataBase<ResponseLogin>,
    Error,
    LoginFormValues
  >((values: LoginFormValues) => authAPI.login(values), {
    onSuccess: (data) => {
      if (data?.resultCode === 0) {
        refetchAuth();
        if (!!queryClient.getQueriesData('captcha')) {
          captchaQuery.remove();
        }       
        navigate(ROUTE_PATH.MAIN);
      } else {
        if (data.resultCode === 10) {
          captchaQuery.refetch();
        }
        throw new Error(data?.messages[0]);
      }
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      loginMutation.mutate(values);
    },
    [loginMutation]
  );

  if (isAuth) navigate(ROUTE_PATH.MAIN);

  return (
    <>
      <h1>Login</h1>
      {!!error && (
        <ErrorMessage
          key={generateKey(error.message)}
          message={error.message}
        />
      )}
      <LoginForm onSubmit={onSubmit} captcha={captchaQuery.data?.url} />
    </>
  );
};

export default Login;
