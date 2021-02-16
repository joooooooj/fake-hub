import React from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditPage(props) {
    const {register, errors, handleSubmit} = useForm();


    const handleCreateNewPage = (data) => {
        data.repository = props.match.params.id;
        fetch("http://localhost:8000/page/", {
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
    }

    return (
        <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
              onSubmit={handleSubmit(handleCreateNewPage)}>
            <span className="w-100 text-left" style={{fontSize: "36px"}}> Create new page</span>
            <Form.Group className="text-left">
                <Form.Label>Page name</Form.Label>
                <Form.Control
                    name="title"
                    type="text" className="w-100 text-light bg-dark"
                    style={{'height': '40px', 'borderRadius': '10px', marginTop: '20px'}}
                    ref={register({required: true})}/>
            </Form.Group>
            <Form.Group className="text-left">
                <Form.Label>Page content</Form.Label>
                <Form.Control
                    name="content"
                    as="textarea" className="w-100 text-light bg-dark mt-5" style={{
                    'minHeight': '200px', 'borderRadius': '10px',
                    'marginTop': '20px', 'maxHeight': '300px'
                }}
                    ref={register({required: true})}/>
            </Form.Group>
            <Button variant="success"
                    type="submit"
                    className="mt-3 float-right">
                Save page
            </Button>
        </Form>
    );
}
