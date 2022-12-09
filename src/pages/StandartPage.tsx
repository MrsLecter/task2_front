import { Button } from "../UI/Button/Button";
import { About } from "../components/About/About";
import { Header } from "../components/Header/Header";
import classes from "../style/StandartPage.module.scss";

export const StandartPage = () => {
  const moreBtnHandler = () => {
    alert("Dummy data");
  };

  return (
    <div className={classes.standart}>
      <Header />
      <div className={classes.standart__about}>
        <About />
        <Button clickHandler={moreBtnHandler} label={"Learn More"} />
      </div>
    </div>
  );
};
