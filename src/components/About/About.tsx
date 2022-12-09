import { useContext, useEffect, useState } from "react";
import {
  makePageRequest,
  makeRefreshRequest,
  makePageRequestWithInterceptor,
} from "../../api/axios-requests";
import { AuthContext } from "../../store/auth-context";
import {
  AxiosResponseType,
  CredentialsType,
  AuthContextType,
} from "../../api/axios-requests.types";
import classes from "./About.module.scss";
import { useHistory } from "react-router-dom";

export const About = () => {
  const history = useHistory();
  const authCntx = useContext(AuthContext);
  const [tokenInfo, setTokenInfo] = useState("");

  useEffect(() => {
    const getTokenInformaion = async () => {
      try {
        const response: AxiosResponseType =
          await makePageRequestWithInterceptor(authCntx);
        if (response.data.status === "error") {
          console.error("Error!", response.data);
          setTokenInfo("Error!");
          history.push("/login");
        }
        if (response.data.body?.status === "ok") {
          const { message } = response.data.body;
          setTokenInfo(message as string);
        }
      } catch (err: any) {
        console.error("Error in getTokenInformaion: ", err);
      }
    };

    getTokenInformaion();
  });

  return (
    <div className={classes.about}>
      <div className={classes.about__title}>about page</div>
      <div className={classes.about__tokenInfo}>
        {tokenInfo ? tokenInfo.toUpperCase() : "undefined"}
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
        repellendus totam natus enim doloribus voluptas facilis velit ratione,
        quasi ipsa laborum! Ipsam sint magnam possimus nulla odit quibusdam
        provident amet.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt excepturi
        nesciunt illo odit voluptates, possimus dolor facilis qui, incidunt nisi
        delectus. Provident nihil tempore commodi, blanditiis optio illum
        incidunt placeat.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
        quibusdam quaerat voluptate earum doloribus, consequuntur debitis
        consectetur optio obcaecati, ipsum repellendus itaque esse quae unde
        animi necessitatibus. Facere, officiis sed? Quia optio molestiae eum
        voluptatem, eveniet earum officia esse? Eveniet, voluptatibus quia illum
        necessitatibus possimus laudantium atque hic repellat assumenda porro,
        saepe, a repellendus minima obcaecati magni. Nobis, impedit fugiat.
      </p>
    </div>
  );
};
