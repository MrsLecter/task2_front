import { FormEvent, useState, useContext } from "react";
import { useInput } from "../../hooks/use-input";
import { Button } from "../../UI/Button/Button";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../../data/constants";

import { makeLoginRequest, makeSignupRequest } from "../../api/axios-requests";
import {
  AxiosResponseType,
  CredentialsType,
} from "../../api/axios-requests.types";

import classes from "./AuthForm.module.scss";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

export const AuthForm = () => {
  let history = useHistory();
  const authCntx = useContext(AuthContext);
  const currentPath = useRouteMatch().path;
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const {
    value: email,
    error: emailIsValid,
    changeHandler: emailChangeHandler,
  } = useInput({ regexp: EMAIL_REGEXP });

  const {
    value: password,
    error: passwordlIsValid,
    changeHandler: passwordChangeHandler,
  } = useInput({ regexp: PASSWORD_REGEXP });

  const submitBtnHandler = (event: MouseEvent) => {
    if (currentPath === "/login") {
      setIsLogin((loginState) => !loginState);
    }
  };

  const switchBtnHandler = () => {
    if (currentPath === "/login") {
      history.push("/signup");
    }
    if (currentPath === "/signup") {
      history.push("/login");
    }
  };

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }
    if (emailIsValid && passwordlIsValid) {
      console.log("submit click", email, password);
      setIsLoading(true);
      if (currentPath === "/login") {
        const response: AxiosResponseType = await makeLoginRequest(
          email,
          password
        );
        setIsLoading(false);
        if (response.data.statusCode === 200) {
          const { access_token, refresh_token } = response.data
            .body as CredentialsType;
          authCntx.login(access_token, refresh_token);
          console.log("Login succesfully, go to me");
          history.push("/me");
        }
        if (response.data.status_code === 401) {
          console.log("unauthorized, got to signup");
          history.push("/signup");
        }
      }
      if (currentPath === "/signup") {
        const response: AxiosResponseType = await makeSignupRequest(
          email,
          password
        );
        console.log(response);
        setIsLoading(false);
        if (response.data.status === "Ok") {
          console.log("User created.Go to login");
          history.push("/login");
        } else {
          alert("An error occured: " + response.status);
        }
      }
    }
  };

  return (
    <section className={classes.auth}>
      <div>
        <h1>{currentPath === "/signup" ? "Signup" : "Login"}</h1>
      </div>
      {isLoading && !requestError && (
        <div className={classes.auth__loading}>Sending request...</div>
      )}
      {requestError && (
        <div className={classes.auth__loading}>Request error. Wait...</div>
      )}
      {!isLoading && (
        <form
          onSubmit={onFormSubmit}
          method="POST"
          className={classes.auth__form}
          name="signupform"
        >
          <div>
            <label className={classes.auth__label} htmlFor="email">
              Email:
            </label>
            <input
              className={
                emailIsValid ? classes.auth__input : classes.auth__inputInvalid
              }
              type="email"
              id="email"
              onChange={emailChangeHandler}
              value={email}
            />

            {emailIsValid ? (
              <div className={classes.auth__errorMessage}></div>
            ) : email.length === 0 ? (
              <div className={classes.auth__errorMessage}>
                Email must not be empty
              </div>
            ) : (
              <div className={classes.auth__errorMessage}>
                Error: invalid email
              </div>
            )}
          </div>

          <div>
            <label className={classes.auth__label} htmlFor="password">
              Password:
            </label>
            <input
              className={
                passwordlIsValid
                  ? classes.auth__input
                  : classes.auth__inputInvalid
              }
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              value={password}
            />
            {passwordlIsValid ? (
              <div className={classes.auth__errorMessage}></div>
            ) : password.length === 0 ? (
              <div className={classes.auth__errorMessage}>
                Password must not be empty
              </div>
            ) : (
              <div className={classes.auth__errorMessage}>
                Error: invalid password
              </div>
            )}
          </div>

          {!isLoading && (
            <div className={classes.auth__buttons}>
              <Button
                clickHandler={submitBtnHandler}
                label={"Submit"}
                forbidden={
                  !(emailIsValid && passwordlIsValid && email && password)
                }
              />
              <Button
                clickHandler={switchBtnHandler}
                label={currentPath === "/signup" ? "Login" : "Signup"}
              />
            </div>
          )}
        </form>
      )}
    </section>
  );
};
