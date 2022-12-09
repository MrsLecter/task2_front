import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { PrivateRouteProps } from "./PrivateRoute.types";

export const PrivateRoute = ({ children, path }: PrivateRouteProps) => {
  const { accessToken } = useContext(AuthContext);
  return (
    <Route path={path} exact>
      {!accessToken ? <Redirect to="/login" /> : children}
    </Route>
  );
};
