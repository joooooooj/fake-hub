import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login(props) {

    const { register, errors, handleSubmit } = useForm();
    const [error, setError] = useState(false); // Set true when server return error

    const login = (data) => {
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.token);
                props.login(data.token);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Row className="justify-content-md-center">
            <Form className="mt-5 mb-5 w-25" onSubmit={handleSubmit(login)}>
                <h3 className="text-left pb-3">SIGN IN</h3>
                {error &&
                    <h6 className="text-danger text-left pb-1">Invalid user credentials!</h6>
                }
                <Form.Group className="text-left">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        name="username"
                        ref={register({ required: true })}
                        className={errors.password ? "border border-danger" : ""}
                        placeholder="Enter username" />
                    {errors.username &&
                        <div className="text-danger font-weight-bold">
                            Username required!
                        </div>
                    }
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        ref={register({ required: true })}
                        name="password"
                        className={errors.password ? "border border-danger" : ""}
                        placeholder="Password" />
                    {errors.password &&
                        <div className="text-danger font-weight-bold">
                            Password required!
                        </div>
                    }
                </Form.Group>
                <Form.Text className="text-muted text-left">
                    <Link to="/reset-password">Forgot your password?</Link>
                </Form.Text>
                <Form.Text className="text-muted text-left">
                    <Link to="/register">Don't have an account? Sign up.</Link>
                </Form.Text>
                <Button variant="warning" type="submit" className="w-100 mt-3">
                    Login
            </Button>
            </Form>
        </Row>
    )
}