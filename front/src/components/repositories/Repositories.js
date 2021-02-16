import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Repositories(props) {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        fetch('/api/repository', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setRepositories(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <Container fluid className="ml-3">
            <Row className="mb-5">
                <h3 className="mr-5">Repositories</h3>
                <Button variant="success" className="">
                    <span className="material-icons mr-2">summarize</span>
                    NEW
                </Button>
            </Row>
            <Row className="mb-5">
                <ul className="list-unstyled">
                    {
                        repositories?.map((repo, index) => {
                            return (
                                <li className="font-weight-bold" key={index}>
                                    <Link to={"/template/repository/" + repo.id}>{(repo.team ? repo.team.name : repo.owner?.username)} / {repo.name}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </Row>
        </Container>
    );
}