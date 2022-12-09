import classes from "../style/Home.module.scss";
import { Header } from "../components/Header/Header";
import { Greeting } from "../components/Greeting/Greeting";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const authCntx = useContext(AuthContext);
  const history = useHistory();

  if (!authCntx.isLoggedIn) {
    const timer = setTimeout(() => {
      history.push("/login");
      clearTimeout(timer);
    }, 2000);
  }

  return (
    <div className={classes.home}>
      <Header />
      <Greeting />
    </div>
  );
};
