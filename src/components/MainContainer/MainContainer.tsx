import { AuthForm } from "../AuthForm/AuthForm";
import classes from "./MainContainer.module.scss";

export const MainContainer = (props: any) => {
  return (
    <div className={classes.container}>
      <div className={classes.container__form}>
        <AuthForm />
      </div>
    </div>
  );
};
