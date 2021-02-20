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
    function closeProject(project){

        project.status = 'Closed'
        fetch('/api/project/' + project?.id+'/', {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            },
            body:JSON.stringify(project)
        })


            .then(data => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    function openProject(project){

        project.status = 'Open'
        fetch('/api/project/' + project?.id+'/', {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            },
            body:JSON.stringify(project)
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
                                    <Link
                                        to={"/template/repository/" + props?.repo?.id + '/edit-project/' + project.id}  {...props}>
                                        <button className="ml-2 btn-info">edit</button>
                                    </Link>
                                    <button className="ml-2 btn-danger" onClick={() => deleteProject(project.id)}>delete
                                    </button>
                                    { project?.status==='Closed'&&
                                        <button className="ml-2 btn-warning"
                                                onClick={() => closeProject(project)}>open
                                        </button>
                                    }
                                    { project?.status==='Open'&&
                                    <button className="ml-2 btn-warning"
                                            onClick={() => openProject(project)}>close
                                    </button>
                                    }
                                </div>

                            </ListGroup.Item>
                        )

                    })
                }

            </ListGroup>

        </>
    );
}