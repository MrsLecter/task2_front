import axios from "axios";
import {
  AxiosResponseType,
  AuthContextType,
  CredentialsType,
} from "./axios-requests.types";
import {
  BASIC_ROOT,
  BASIC_SIGNUP,
  BASIC_LOGIN,
  BASIC_PAGE,
  BASIC_REFRESH,
  REQUEST_HEADERS,
} from "../data/constants";

export const makeSignupRequest = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response: AxiosResponseType = await axios({
      method: "post",
      url: BASIC_SIGNUP,
      data: {
        email,
        password,
      },
      withCredentials: false,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeSignupRequest: ", err);
    return err.code;
  }
};

export const makeLoginRequest = async (email: string, password: string) => {
  try {
    const response: AxiosResponseType = await axios({
      method: "post",
      url: BASIC_LOGIN,
      params: {
        email,
        password,
      },
      withCredentials: false,
      headers: REQUEST_HEADERS,
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeLoginRequest: ", err);
    return err.code;
  }
};

export const makePageRequest = async (accessToken: string) => {
  try {
    const response: AxiosResponseType = await axios({
      method: "get",
      baseURL: BASIC_PAGE,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makePageRequest: ", err);
    return err.code;
  }
};

export const makeRefreshRequest = async (refreshToken: string) => {
  try {
    const response: AxiosResponseType = await axios({
      method: "post",
      baseURL: BASIC_REFRESH,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        ...REQUEST_HEADERS,
      },
    });
    return response;
  } catch (err: any) {
    console.error("An error occured in makeRefreshRequest: ", err);
    return err.code;
  }
};

export const makePageRequestWithInterceptor = async (
  authContext: AuthContextType
) => {
  try {
    const instance = axios.create({
      baseURL: BASIC_ROOT,
      timeout: 500,
      headers: {
        Authorization: `Bearer ${authContext.accessToken}`,
        ...REQUEST_HEADERS,
      },
    });
    instance.interceptors.request.use(
      async (req) => {
        const currentTime = new Date().getTime();
        if (+authContext.expiresIn - +currentTime <= 0) {
          const response: AxiosResponseType = await makeRefreshRequest(
            authContext.refreshToken
          );
          const { access_token, refresh_token } = response.data
            .body as CredentialsType;
          authContext.login(access_token, refresh_token);
        }
        return req;
      },
      (err) => {}
    );
    return await instance.get("/me");
  } catch (err: any) {
    console.error("An error occured in makePageRequestWithInterceptor: ", err);
    return err.code;
  }
};
