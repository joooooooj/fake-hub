import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditTeam(props) {

    const {register, errors, handleSubmit} = useForm();
    const [team, setTeam] = useState();

    const [edit,setEdit] = useState(false)

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSave = () => {
        team.members.push({"username": document.getElementById("newName").value})
        setTeam(team)
        setShow(false);
        console.log(team)
    }
    const handleShow = () => {
        setShow(true);
    }
    //

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
                    setEdit(true)
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else{

            fetch('/api/user/' +JSON.parse(localStorage.getItem("user")).id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    const team={}
                    team.members = [data]
                    setTeam(team)
                    console.log(team)
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        }
    }, []);


    const handleCreateNewTeam = (data) => {

        if (edit){
            handleEditTeam(data)
        }
        else {

            data.owner = JSON.parse(JSON.parse(localStorage.getItem("user")).id);

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
    }

    const handleEditTeam = (data) => {
        data.owner = JSON.parse(JSON.parse(localStorage.getItem("user")).id);
        data.id =  props.match.params.id
        console.log(data)
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
                props.history.push("/template/profile");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a member</Modal.Title>

                </Modal.Header>
                <Modal.Body><input type="text" id="newName" placeholder="enter member username"/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
                  onSubmit={handleSubmit(handleCreateNewTeam)}>
                <span className="w-100 text-left" style={{fontSize: "36px"}}> Team</span>
                <Form.Group className="text-left mt-3">
                    <Form.Label>Team name</Form.Label>
                    {
                        edit===true && team &&
                        <Form.Control
                            defaultValue={team.name !== undefined ? team.name : ""}
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                    {
                        edit===false &&
                        <Form.Control
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                </Form.Group>

                <Form.Group className="text-left mt-5">
                    <Form.Label>Team members</Form.Label>
                    <span className="edit"
                                                               onClick={() => handleShow()}>
                                         <span className="material-icons mr-1">edit</span>
                                    </span>
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
                            return (<option className="text-light" key={index} value={item.username}
                                            label={item.username}>{item.username}</option>)

                        })
                        }
                    </Form.Control>
                </Form.Group>

                <Button variant="success"
                        type="submit"
                        className="mt-3 float-right">
                    Save
                </Button>
            </Form>
        </div>
    );
}