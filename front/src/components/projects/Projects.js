import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";


export default function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        console.log(props)

        fetch('/api/project/' + props?.repo?.id + '/repo', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    function deleteProject(id) {
        fetch('/api/project/' + id, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            }
        })


            .then(data => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div className="w-100" style={{height: '50px'}}>
                <Link to={"/template/repository/" + props?.repo?.id + '/new-project'}>
                    <Button variant="success" className="float-right">
                        <span className="material-icons mr-2"/>
                        New
                    </Button>
                </Link>

            </div>
            <ListGroup>
                {
                    projects?.map((project, index) => {
                        return (
                            < ListGroup.Item className="font-weight-bold" key={index}>
                                <Link
                                    to={"/template/repository/" + props?.repo?.id + "/project/" + project.id} {...props}>({project.status}) {(project.name)} </Link>
                                <div className="text-right">
                                    <button className="ml-2 btn-warning">edit</button>
                                    <button className="ml-2 btn-danger" onClick={() =>deleteProject(project.id)}>delete
                                    </button>
                                </div>

                            </ListGroup.Item>
                        )

                    })
                }
            </ListGroup>
        </>
    );
}