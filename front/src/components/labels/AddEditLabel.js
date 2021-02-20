import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditLabel(props) {
    const {register, errors, handleSubmit} = useForm();
    const [label, setLabel] = useState();
    const [selectedColor, setSelectedColor] = useState('#B60205');

    if (props.location.pathname.includes('edit-label') && !label) {
        fetch("/api/label/" + props.match.params.labelId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLabel(data);
                setSelectedColor(data.color);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateNewLabel = (data) => {
        data.repository = props.match.params.id;
        data.color = selectedColor;

        if (label) {
            handleEditLabel(data);
            props.history.push("/template/repository/" + props.match.params.id);
            return;
        }

        fetch('/api/label/', {
            method: 'POST',
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

    const handleEditLabel = (data) => {
        fetch("/api/label/" + label.id + "/", {
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
                  onSubmit={handleSubmit(handleCreateNewLabel)}>
                <span className="w-100 text-left" style={{fontSize: "36px"}}> Create new label</span>
                <Form.Group className="text-left mt-3">
                    <Form.Label>Label name</Form.Label>
                    {
                        label &&
                        <Form.Control
                            defaultValue={label.name !== undefined ? label.name : ""}
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                    {
                        !label &&
                        <Form.Control
                            name="name"
                            type="text" className="w-100 text-light bg-dark"
                            style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                            ref={register({required: true})}/>
                    }
                </Form.Group>
                <Form.Group className="text-left mt-5">
                    <Form.Label>Label description</Form.Label>
                    {
                        label &&
                        <Form.Control
                            defaultValue={label.description !== undefined ? label.description : ""}
                            name="description"
                            as="textarea" className="w-100 text-light bg-dark"
                            style={{
                                'minHeight': '200px', 'borderRadius': '10px',
                                'marginTop': '10px', 'maxHeight': '300px'
                            }}
                            ref={register({required: true})}/>
                    }
                    {
                        !label &&
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
                <div className="d-flex p-3 mt-5" style={{borderRadius: '10px', border: '2px solid white'}}>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#B60205')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#B60205',
                             cursor: 'pointer'
                         }}>red
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#D93F0B')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#D93F0B',
                             cursor: 'pointer'
                         }}>orange
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#FBCA04')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#FBCA04',
                             cursor: 'pointer'
                         }}>yellow
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#0E8A16')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#0E8A16',
                             cursor: 'pointer'
                         }}>green
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#006B75')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#006B75',
                             cursor: 'pointer'
                         }}>light blue
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#E99695')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#E99695',
                             cursor: 'pointer'
                         }}>pink
                    </div>
                    <div className="text-center mr-2"
                         onClick={() => setSelectedColor('#7A3DB8')}
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: '#7A3DB8',
                             cursor: 'pointer'
                         }}>purple
                    </div>
                    <div className="text-center mr-2 ml-auto"
                         style={{
                             width: '100px',
                             height: '30px',
                             borderRadius: '10px',
                             backgroundColor: selectedColor,
                             cursor: 'pointer'
                         }}>chosen
                    </div>
                </div>
                <Button variant="success"
                        type="submit"
                        className="mt-5 float-right">
                    Save label
                </Button>
            </Form>
        </div>
    );
}