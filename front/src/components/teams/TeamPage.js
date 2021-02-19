import React, {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";


export default function TeamPage(props) {

    const [repositories, setRepositories] = useState([]);

    const [team, setTeam] = useState();

    useEffect(() => {

        console.log(props)

        fetch('/api/repository/' + props.match?.params?.id + '/team', {
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

        fetch('/api/team/' + props.match?.params?.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTeam(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [])

    return (
        <div className="teamProfile">
            <h2 className="mb-5">{team?.name} </h2>
            <div className="right">
                <Container fluid className="ml-3">

                    <Tabs>
                        <TabList>

                            <Tab>Repositories</Tab>

                        </TabList>

                        <TabPanel>
                            <h2>Repositories</h2>
                            <div className="w-100" style={{height: '50px'}}>
                                <Link to="/template/newRepository">
                                    <Button variant="success" className="float-right">
                                        <span className="material-icons mr-2"></span>
                                        New
                                    </Button>
                                </Link>
                            </div>
                            <ListGroup>
                                {
                                    repositories?.map((repo, index) => {
                                        return (
                                            < ListGroup.Item className="font-weight-bold" key={index}>
                                                <Link
                                                    to={"/template/repository/" + repo.id}>{(repo.team ? repo.team.name : repo.owner?.username)} / {repo.name}</Link>
                                            </ListGroup.Item>
                                        )

                                    })
                                }
                            </ListGroup>
                        </TabPanel>

                    </Tabs>
                </Container>
            </div>
        </div>
    );
}