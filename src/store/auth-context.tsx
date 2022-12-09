import React, { useState } from "react";
import { ONE_MINUTE_IN_MS } from "../data/constants";

export const AuthContext = React.createContext({
  accessToken: "",
  refreshToken: "",
  expiresIn: "", //because invalid access token signature
  isLoggedIn: false,
  login: (accessToken: string, refreshToken: string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  const userIsLogggedIn = !!accessToken;
  const loginHandler = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setExpiresIn(String(+new Date().getTime() + ONE_MINUTE_IN_MS));
  };
  const logoutHandler = () => {
    setAccessToken("");
    setRefreshToken("");
    setExpiresIn("");
  };

  const contextValue = {
    accessToken,
    refreshToken,
    expiresIn,
    isLoggedIn: userIsLogggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
