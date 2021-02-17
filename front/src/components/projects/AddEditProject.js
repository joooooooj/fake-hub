import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function AddEditProject(props) {

    const {register, errors, handleSubmit} = useForm();
    const [project, setProject] = useState();
    const [projectPresent, setProjectPresent] = useState(true)

    useEffect(() => {
        console.log(props)
        if (props?.location?.route?.contains("new-project"))
            setProjectPresent(false)
        else {
            fetch("/api/project/" + props?.match?.params?.id2, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setProject(data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])


    const handleEditProject = (data) => {
        fetch("/api/project/" + project.id + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateNewProject = (data) => {
        console.log(data)
        data.repository = props?.match?.params?.id;
        fetch("/api/project/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        props.history?.push("/template/repository/" + props?.match?.params?.id);

    }

    return (
        <>

            {

                projectPresent === true && project &&

                <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
                      onSubmit={handleSubmit(handleCreateNewProject)}>
                    <span className="w-100 text-left" style={{fontSize: "36px"}}> Create a new project</span>
                    <Form.Group className="text-left mt-3">
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            defaultValue={project.name !== undefined ? project.name : ""}
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    </Form.Group>
                    <Form.Group className="text-left mt-5">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            defaultValue={project.description !== undefined ? project.description : ""}
                            name="description"
                            as="textarea" className="w-100 text-light bg-dark"
                            style={{
                                'minHeight': '200px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register()}/>
                    </Form.Group>
                    <Button variant="success"
                            type="submit"
                            className="mt-3 float-right">
                        Submit
                    </Button>
                </Form>

            }
            {
                projectPresent === false &&

                <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
                      onSubmit={handleSubmit(handleCreateNewProject)}>
                    <span className="w-100 text-left" style={{fontSize: "36px"}}> Create a new project</span>
                    <Form.Group className="text-left mt-3">
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    </Form.Group>
                    <Form.Group className="text-left mt-5">
                        <Form.Label>Description</Form.Label>
                        projectPresent===false &&
                        <Form.Control
                            name="description"
                            as="textarea" className="w-100 text-light bg-dark"
                            style={{
                                'minHeight': '200px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register()}/>
                    </Form.Group>
                    <Button variant="success"
                            type="submit"
                            className="mt-3 float-right">
                        Submit
                    </Button>
                </Form>

            }
        </>);
}

