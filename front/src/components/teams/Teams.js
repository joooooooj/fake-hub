import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Teams(props) {

    const [teams, setTeams] = useState([]);

    useEffect(() => {

        fetch('/api/team', {

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
        <Container fluid className="ml-3">
            <Row className="mb-5">
                <h3 className="mr-5">Teams</h3>
                <Button variant="success" className="">
                    <span className="material-icons mr-2">group</span>
                    NEW
                </Button>
            </Row>
            <Row className="mb-5">
                <ul className="list-unstyled">
                    {
                        teams?.map((team, index) => {
                            return (
                                <li className="font-weight-bold" key={index}>
                                    <Link to={"/template/team/" + team.id}>{team.name}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </Row>
        </Container>
    );
}