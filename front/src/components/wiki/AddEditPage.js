import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditPage(props) {
    const {register, errors, handleSubmit} = useForm();

    const [page, setPage] = useState();

    if (props.location.pathname.includes("edit-wiki-page") && !page) {
        fetch("http://localhost:8000/api/page/" + props.match.params.pageId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPage(data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleCreateNewPage = (data) => {
        data.repository = props.match.params.id;
        if (page) {
            handleEditPage(data);
            props.history.push("/repository/" + props.match.params.id);
            return;
        }
        fetch("http://localhost:8000/api/page/", {
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
        props.history.push("/repository/" + props.match.params.id);
    }

    const handleEditPage = (data) => {
        fetch("http://localhost:8000/api/page/" + page.id + "/", {
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
        <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}
              onSubmit={handleSubmit(handleCreateNewPage)}>
            <span className="w-100 text-left" style={{fontSize: "36px"}}> Create new page</span>
            <Form.Group className="text-left mt-3">
                <Form.Label>Page name</Form.Label>
                {
                    page &&
                    <Form.Control
                        defaultValue={page.title !== undefined ? page.title : ""}
                        name="title"
                        type="text" className="w-100 text-light bg-dark"
                        style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                        ref={register({required: true})}/>
                }
                {
                    !page &&
                    <Form.Control
                        name="title"
                        type="text" className="w-100 text-light bg-dark"
                        style={{'height': '40px', 'borderRadius': '10px', marginTop: '10px'}}
                        ref={register({required: true})}/>
                }
            </Form.Group>
            <Form.Group className="text-left mt-5">
                <Form.Label>Page content</Form.Label>
                {
                    page &&
                    <Form.Control
                        defaultValue={page.content !== undefined ? page.content : ""}
                        name="content"
                        as="textarea" className="w-100 text-light bg-dark"
                        style={{
                            'minHeight': '200px', 'borderRadius': '10px',
                            'marginTop': '10px', 'maxHeight': '300px'
                        }}
                        ref={register({required: true})}/>
                }
                {
                    !page &&
                    <Form.Control
                        name="content"
                        as="textarea" className="w-100 text-light bg-dark"
                        style={{
                            'minHeight': '200px', 'borderRadius': '10px',
                            'marginTop': '10px', 'maxHeight': '300px'
                        }}
                        ref={register({required: true})}/>
                }
            </Form.Group>
            <Button variant="success"
                    type="submit"
                    className="mt-3 float-right">
                Save page
            </Button>
        </Form>
    );
}
