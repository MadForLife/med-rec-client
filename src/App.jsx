import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Authenticate from "./keycloak/Authenticate";
import keycloak from "./keycloak/KeycloakConfig";
import Header from "./components/Header";
import LoadPatients from "./components/LoadPatients";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");

  // Use Authenticate hook directly
  const [authenticated] = Authenticate();

  useEffect(() => {
    if (authenticated) {
      setLogin(true);
      setRoles(keycloak.tokenParsed.realm_access.roles);
      setUsername(keycloak.tokenParsed.preferred_username);
    }
  }, [authenticated]);

  return (
    <div>
      {isLogin && <Header roles={roles} username={username} />}
      <div className="content">
        <LoadPatients />
      </div>
    </div>
  );
}

export default App;
