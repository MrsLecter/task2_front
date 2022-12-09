import { AxiosHeaders } from "axios";

export type AxiosResponseType = {
  config: Object;
  data: {
    body?: {
      access_token: string;
      refresh_token: string;
      message?: string;
      status?: string;
    };
    message: string;
    status: string;
    status_code?: number;
    statusCode?: number;
  };
  statusCode?: number;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};

export type CredentialsType = {
  access_token: string;
  refresh_token: string;
};

export type AuthContextType = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};
