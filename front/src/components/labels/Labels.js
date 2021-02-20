import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";

export default function Labels(props) {

    const [labels, setLabels] = useState();

    useEffect(() => {
        handleGetLabels();
    }, []);

    const handleGetLabels = () => {
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
    }

    const handleNewLabel = () => {
        props.history.push("/template/repository/" + props.match.params.id + "/new-label");
    }

    const handleEditLabel = (id) => {
        props.history.push("/template/repository/" + props.match.params.id + "/edit-label/" + id);
    }

    const handleDeleteLabel = (id) => {
        fetch('/api/label/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            }
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
        setTimeout(() => {
            setLabels(null);
            handleGetLabels();
        }, 500);
    }

    return (
        <div className="w-100 mt-5 pt-5">
            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
                <Button variant="success" className="float-right mb-3" onClick={() => handleNewLabel()}>New
                    label</Button>
                <Table striped hover variant="dark" style={{borderRadius: '15px'}}>
                    <thead>
                    <tr>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        labels &&
                        labels.map((label, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="text-center"
                                             style={{
                                                 backgroundColor: label.color,
                                                 borderRadius: '20px',
                                                 maxWidth: '200px',
                                                 height: '30px'
                                             }}>
                                            {label.name}
                                        </div>
                                    </td>
                                    <td>{label.description}</td>
                                    <td><Button variant="primary"
                                                onClick={() => handleEditLabel(label.id)}>Edit</Button>
                                    </td>
                                    <td><Button variant="danger"
                                                onClick={() => handleDeleteLabel(label.id)}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}