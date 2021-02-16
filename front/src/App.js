import './styles/base.scss';
import NavigationBar from "./components/core/NavigationBar";
import {Container} from "react-bootstrap";
import Routes from "./Routes";

function App() {

  return (
    <div className="app">
       <NavigationBar/>
       <Container fluid>
         <Routes/>
       </Container>
    </div>
  );
}

export default App;
