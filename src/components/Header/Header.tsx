import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { NavLink, useRouteMatch } from "react-router-dom";

import logo from "../../assets/logo.svg";

import classes from "./Header.module.scss";

export const Header = () => {
  const authCntx = useContext(AuthContext);
  const currentPath = useRouteMatch().path;

  const logoutHandler = () => {
    authCntx.logout();
  };

  return (
    <div className={classes.header}>
      <NavLink className={classes.header__logo} to="/">
        Mountain
      </NavLink>
      <div className={classes.header__linkBox}>
        {authCntx.isLoggedIn && (
          <NavLink
            activeClassName={classes.header__active}
            className={classes.header__btn}
            to="/me"
          >
            Visit Me
          </NavLink>
        )}
        {authCntx.isLoggedIn && (
          <button onClick={logoutHandler} className={classes.header__logout}>
            Logout
          </button>
        )}
        {!authCntx.isLoggedIn &&
          currentPath !== "/login" &&
          currentPath !== "/signup" && (
            <NavLink
              activeClassName={classes.header__active}
              className={classes.header__btn}
              to="/login"
            >
              Please, login
            </NavLink>
          )}
      </div>
    </div>
  );
};
