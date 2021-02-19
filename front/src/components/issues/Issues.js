import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Form, Row, Table} from "react-bootstrap";

export default function Issues(props) {

    useEffect(() => {
        if (props?.user?.id) {
            fetch('/api/task/'+props?.user?.id+'/user', {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    })

    return (
        <div className="issues">
            <div className="row container-fluid mb-3">
                <div className="col-10">
                    <Form.Control className="mt-2 mb-3 w-25" type="text" placeholder="Search"/>
                </div>
                <div className="col-2 add-new">
                    <Button className="btn-success">NEW</Button>
                </div>
            </div>
            <Table striped hover>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="issue">
                        <div className="row">
                            <span className="material-icons mr-2 text-success">error_outline</span>
                            <span className="issue-title">Good first issue</span>
                        </div>
                        <div className="row issue-info">
                            #45 opened 5 days ago by TLazarevic
                            <span className="material-icons">outlined_flag</span>
                            one good milestone
                        </div>
                    </td>
                    <td className="button-td">
                        <Button className="btn-primary">EDIT</Button>
                    </td>
                    <td className="button-td">
                        <Button className="btn-danger">DELETE</Button>
                    </td>
                </tr>
                <tr>
                    <td className="issue">
                        <div className="row">
                            <span className="material-icons mr-2 text-danger">error_outline</span>
                            <span className="issue-title">Some issue</span>
                        </div>
                        <div className="row issue-info">
                            #12 closed 5 days ago by ivanabrkic
                        </div>
                    </td>
                    <td className="button-td">
                        <Button className="btn-primary">EDIT</Button>
                    </td>
                    <td className="button-td">
                        <Button className="btn-danger">DELETE</Button>
                    </td>
                </tr>
                <tr>
                    <td className="issue">
                        <div className="row">
                            <span className="material-icons mr-2 text-danger">error_outline</span>
                            <span className="issue-title">Ah issue</span>
                        </div>
                        <div className="row issue-info">
                            #1 closed 5 days ago by igorMales98
                        </div>
                    </td>
                    <td className="button-td">
                        <Button className="btn-primary">EDIT</Button>
                    </td>
                    <td className="button-td">
                        <Button className="btn-danger">DELETE</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}