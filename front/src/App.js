import './styles/base.scss';
import NavigationBar from "./components/core/NavigationBar";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Routes from "./Routes";
import UseLocalStorage from './UseLocalStorage';
import { useState } from 'react';

function App() {
  const history = useHistory();

  const [user, setUser] = UseLocalStorage("user", null);

  const logout = () => {
    setUser(null);
  }

  const login = (user) => {
    setUser(user);
    history.push('/home');
  }

  const [bodyTheme, setBodyTheme] = useState("dark");

  return (
    <div className={"app " +  (bodyTheme === "dark" ? "bg-dark text-light" : "bg-light text-dark")}>
      <NavigationBar logout={logout} user={user} setBodyTheme={setBodyTheme}/>
      <Container fluid>
        <Routes login={login} user={user}/>
      </Container>
    </div>
  );
}

export default App;
