import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditTeam(props) {

    const {register, errors, handleSubmit} = useForm();
    const [team, setTeam] = useState();

    useEffect(() => {

        console.log(props)

        if (props.location.pathname.includes("edit-team") && !team) {
            fetch("/api/team/" + props.match.params.id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTeam(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);


    const handleCreateNewTeam = (data) => {
        data.repository = JSON.parse(props.match.params.id);
        data.status = 'Open';

        if (team) {
            handleEditTeam(data);
            props.history.push("/template/profile" );
            return;
        }
        fetch("/api/team/", {
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
        props.history.push("/template/profile");
    }

    const handleEditTeam = (data) => {
        fetch("/api/team/" + team.id + "/", {
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
                  onSubmit={handleSubmit(handleCreateNewTeam)}>
                <span className="w-100 text-left" style={{fontSize: "36px"}}> Team</span>
                <Form.Group className="text-left mt-3">
                    <Form.Label>Team name</Form.Label>
                    {
                        team &&
                        <Form.Control
                            defaultValue={team.name !== undefined ? team.name : ""}
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                    {
                        !team &&
                        <Form.Control
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                </Form.Group>

                <Form.Group className="text-left mt-5">
                    <Form.Label>Team members</Form.Label>
                    <Form.Control
                        name="members"
                        as="select" multiple
                        className="w-100  bg-dark"
                        style={{
                            'minHeight': '100px', 'borderRadius': '10px',
                            'marginTop': '10px', 'maxHeight': '300px'
                        }}
                        ref={register({required: true})}>
                        {team?.members &&
                        team?.members.map((item, index) => {
                            return (<option className="text-light" key={index} value={item.id}
                                            label={item.label}>{item.name}</option>)

                        })
                        }
                    </Form.Control>
                </Form.Group>
                {/*<Form.Group className="text-left mt-5">*/}
                {/*    <Form.Label>Milestone due date</Form.Label>*/}
                {/*    <Form.Control as="time" />*/}
                {/*</Form.Group>*/}

                <Button variant="success"
                        type="submit"
                        className="mt-3 float-right">
                    Save
                </Button>
            </Form>
        </div>
    );
}