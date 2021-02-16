import './styles/base.scss';
import NavigationBar from "./components/core/NavigationBar";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Routes from "./Routes";
import UseLocalStorage from './UseLocalStorage';
import { useState } from 'react';

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

  const [bodyTheme, setBodyTheme] = useState("dark");

  return (
    <div className={"app " +  (bodyTheme === "dark" ? "bg-dark text-light" : "bg-light text-dark")}>
      <NavigationBar logout={logout} token={token} setBodyTheme={setBodyTheme}/>
      <Container fluid>
        <Routes login={login} token={token}/>
      </Container>
    </div>
  );
}

export default App;
