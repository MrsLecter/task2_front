import { Link } from "react-router-dom";

import classes from "./Greeting.module.scss";

export const Greeting = () => {
  return (
    <div>
      <div className={classes.greeting}>
        <p className={classes.greeting__description}>website with auth</p>
        <p className={classes.greeting__title}>Welcome</p>
        <p>
          To use service, please{" "}
          <Link className={classes.greeting__link} to="./login">
            Login
          </Link>
        </p>
      </div>
      <div className={classes.greeting__backblock}></div>
    </div>
  );
};
