import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Team from "../teams/Team";
import {Link} from "react-router-dom";

export default function ProfileTeams(props) {

    const [teams, setTeams] = useState();


    const handleGetTeams = () => {
        fetch('/api/team/' + JSON.parse(localStorage.getItem("user")).id + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTeams(data);
            })
            .catch(error => {
                console.error(error);
            });


    }

    const handleDeleteTeam = (team) => {
        fetch("/api/team/" + team.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
        setTimeout(() => {
            setTeams(null);
            handleGetTeams();
        }, 500)
    }

    const handleLeaveTeam = (team) => {
        const temp = team
        temp.members = team.members.filter((item) => item.id !== JSON.parse(localStorage.getItem("user")).id);
        console.log(temp.members)

        fetch('/api/team/' + team.id + '/leave/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
            body: JSON.stringify(temp)
        })
            .then(response => response.json())
            .then(data => {
                fetch('/api/team/' + JSON.parse(localStorage.getItem("user")).id + '/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setTeams(data);
                        console.log(data)
                    })
                    .catch(error => {
                        console.error(error);
                    });
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleCreateNewTeam = () => {
        props.history.push("/template/new-team");
    }

    const handleEditTeam = (team) => {
        props.history.push("/template/edit-team/" + team.id + '/');
    }

    useEffect(() => {

        console.log(props)
        fetch('/api/team/' + JSON.parse(localStorage.getItem("user")).id + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTeams(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [])


    return (
        <div className='w-100 pt-4'>
            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
                <Button variant="success" className="float-right mb-3"
                        onClick={() => handleCreateNewTeam()}>New</Button>
                {
                    teams &&
                    teams?.map((team, index) => {
                        return <Team key={team.id}
                                {...props}
                                team={team}
                                delete={handleDeleteTeam}
                                edit={handleEditTeam}
                                leave={handleLeaveTeam}
                            />

                    })
                }
            </div>
        </div>
    );
}