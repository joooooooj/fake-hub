import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {

  const [teams, setTeams] = useState([]);

  const getTeams = () => {
    fetch('https://fake-hub.herokuapp.com/api/team', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setTeams(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  return (
    <div className="App">
      <header className="App-header">
          <button onClick={() => getTeams()}>GIVE US OUR TEAMS</button>
          <ul>
            {
              teams.map((team) => {
               return (
                   <li>
                     {team.name} :
                     <ul>
                     {team.members.map((member) => {
                       return (
                           <li>{member.username}</li>
                       );
                     })}
                     </ul>
                   </li>);
              })
            }
          </ul>
      </header>
    </div>
  );
}

export default App;