import Authenticate from "./keycloak/Authenticate";
import DataFetcher from "./components/DataFetcher";

function App() {
  const [isLogin] = Authenticate();
  return isLogin ? <DataFetcher /> : <div>Loading...</div>;
}

export default App;
