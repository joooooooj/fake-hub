import './styles/base.scss';
import NavigationBar from "./components/core/NavigationBar";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Routes from "./Routes";
import UseLocalStorage from './UseLocalStorage';

function App() {
  const history = useHistory();

  const [token, setToken] = UseLocalStorage("token", null);

  const logout = () => {
    setToken(null);
  }

  const login = (token) => {
    setToken(token);
    history.push('/home');
  }

  return (
    <div className="app">
      <NavigationBar logout={logout} token={token} />
      <Container fluid>
        <Routes login={login} token={token}/>
      </Container>
    </div>
  );
}

export default App;
