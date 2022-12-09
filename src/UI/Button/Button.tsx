import { ButtonProps } from "./Button.types";
import classes from "./Button.module.scss";

export const Button = (props: ButtonProps) => {
  const { label, forbidden = false, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={forbidden ? classes.btn__forbidden : classes.btn}
      type="submit"
    >
      {label}
    </button>
  );
};
