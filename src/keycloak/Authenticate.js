import { useEffect, useRef, useState } from "react";
import keycloak from "./KeycloakConfig";
import { setAxiosAuthHeader } from "./AxiosConfig.js";

const Authenticate = () => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  // Because of react strict mode this will run twice
  // that's why we use the isRun flag
  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: true,
        pkceMethod: import.meta.env.VITE_KEYCLOAK_PKCE_CODE,
      })
      .then((authenticate) => {
        setLogin(authenticate);
        setAxiosAuthHeader(keycloak.token);

        // TODO disable logging
        console.log("Authenticated with token: ", keycloak.token);
        console.log("Authenticated", authenticate);
        console.log("Keycloak", keycloak);
      });
  }, []);

  return [isLogin];
};

export default Authenticate;
