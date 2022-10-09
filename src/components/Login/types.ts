export interface requestLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export interface ResponseDataBase {
  resultCode: number;
  messages: string[];
}
export interface ResponseLogin extends ResponseDataBase {
  data: {
    userId?: number;
  };
}
export interface ResponseMe extends ResponseDataBase {
  data: {
    id: number;
    email: string;
    login: string;
  };
}

export interface ResponseLogout extends ResponseDataBase {
  fieldsErrors: string[];
  data: {
    userId: number;
  };
}

export interface ResponseCaptcha {
  url: string;
}

export interface ResponseDataLogin {
  data: ResponseLogin;
}

export interface ResponseDataLogout {
  data: ResponseLogout;
}
export interface ResponseDataMe {
  data: ResponseMe;
}
