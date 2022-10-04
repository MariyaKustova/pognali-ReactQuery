export interface requestLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
}

export interface ResponseData {
  data: ResponseDataLogin;
}

export interface ResponseEmptyData {
  data: ResponseDataLogout;
}

export interface ResponseDataLogin {
  resultCode: number;
  messages: string[];
  data: {
    userId?: number;
  };
}

export interface ResponseDataLogout {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: {
    userId: number;
  };
}

export interface ResponseCaptcha {
  url: string;
}
