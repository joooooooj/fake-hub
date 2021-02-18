import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";

export default function AddEditMilestone(props) {
    const {register, errors, handleSubmit} = useForm();
    const [milestone, setMilestone] = useState();
    const [labels, setLabels] = useState();

    useEffect(() => {
        fetch('/api/label/' + props.match.params.id + '/repo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setLabels(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (props.location.pathname.includes("edit-milestone") && !milestone) {
        fetch("/api/milestone/" + props.match.params.milestoneId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMilestone(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateNewMilestone = (data) => {
        data.repository = JSON.parse(props.match.params.id);
        data.status = 'Open';
        data.dueDate = data.dueDate + 'T00:00:00Z';
        data.id = props.match.params.milestoneId;

        if (milestone) {
            handleEditMilestone(data);
            props.history.push("/template/repository/" + props.match.params.id);
            return;
        }
        fetch("/api/milestone/", {
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
        props.history.push("/template/repository/" + props.match.params.id);
    }

    const handleEditMilestone = (data) => {
        fetch("/api/milestone/" + milestone.id + "/", {
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

    return (
        <div>
            <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
                  onSubmit={handleSubmit(handleCreateNewMilestone)}>
                <span className="w-100 text-left" style={{fontSize: "36px"}}> Create new milestone</span>
                <Form.Group className="text-left mt-3">
                    <Form.Label>Milestone name</Form.Label>
                    {
                        milestone &&
                        <Form.Control
                            defaultValue={milestone.title !== undefined ? milestone.title : ""}
                            name="title"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                    {
                        !milestone &&
                        <Form.Control
                            name="title"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                </Form.Group>
                <Form.Group className="text-left mt-5">
                    <Form.Label>Milestone description</Form.Label>
                    {
                        milestone &&
                        <Form.Control
                            defaultValue={milestone.description !== undefined ? milestone.description : ""}
                            name="description"
                            as="textarea" className="w-100 text-light bg-dark"
                            style={{
                                'minHeight': '200px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register({required: true})}/>
                    }
                    {
                        !milestone &&
                        <Form.Control
                            name="description"
                            as="textarea" className="w-100 text-light bg-dark"
                            style={{
                                'minHeight': '200px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register({required: true})}/>
                    }
                </Form.Group>
                <Form.Group className="text-left mt-5">
                    <Form.Label>Milestone labels</Form.Label>
                    {milestone &&
                    <Form.Control
                        defaultValue={milestone.labels}
                        name="labels"
                        as="select" multiple
                        className="w-100  bg-dark"
                        style={{
                            'minHeight': '100px', 'borderRadius': '10px',
                            'marginTop': '10px', 'maxHeight': '300px'
                        }}
                        ref={register({required: false})}>
                        {labels &&
                        labels.map((item, index) => {
                            return (<option className="text-light" key={index} value={item.id}
                                            label={item.label}>{item.name}</option>)

                        })
                        }
                    </Form.Control>
                    }
                    {
                        !milestone &&
                        <Form.Control
                            name="labels"
                            as="select" multiple
                            className="w-100  bg-dark"
                            style={{
                                'minHeight': '100px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register({required: false})}>
                            {labels &&
                            labels.map((item, index) => {
                                return (<option className="text-light" key={index} value={item.id}
                                                label={item.label}>{item.name}</option>)

                            })
                            }
                        </Form.Control>
                    }
                </Form.Group>
                <Form.Group className="text-left mt-5">
                    <Form.Label>Milestone due date</Form.Label>
                    {
                        milestone &&
                        <Form.Control
                            defaultValue={milestone.dueDate}
                            name="dueDate"
                            type="date"
                            className="w-100 text-light bg-dark"
                            style={{
                                'height': '50px', 'borderRadius': '10px',
                                'marginTop': '10px',
                            }}
                            ref={register({required: false})}/>
                    }
                    {
                        !milestone &&
                        <Form.Control
                            name="dueDate"
                            type="date"
                            className="w-100 text-light bg-dark"
                            style={{
                                'height': '50px', 'borderRadius': '10px',
                                'marginTop': '10px',
                            }}
                            ref={register({required: false})}/>
                    }
                </Form.Group>

                <Button variant="success"
                        type="submit"
                        className="mt-3 float-right">
                    Save milestone
                </Button>
            </Form>
        </div>
    );
}