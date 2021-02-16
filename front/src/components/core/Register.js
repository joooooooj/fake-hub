import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register() {

    const { register, errors, handleSubmit } = useForm();
    const [error, setError] = useState(false); // Set true when server return error

    const handleRegister = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <Row className="justify-content-md-center">
            <Form className="mt-5 mb-5 w-25" onSubmit={handleSubmit(handleRegister)}>
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
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text"
                        name="first_name"
                        ref={register()}
                        placeholder="Enter first name" />
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text"
                        name="last_name"
                        ref={register()}
                        placeholder="Enter first name" />
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                        name="email"
                        ref={register({ required: true })}
                        className={errors.email ? "border border-danger" : ""}
                        placeholder="Enter email" />
                    {errors.email &&
                        <div className="text-danger font-weight-bold">
                            Email required!
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
                    <Link to="/template/login">Already have an account? Sign up.</Link>
                </Form.Text>
                <Button variant="warning" type="submit" className="w-100 mt-3">
                    Register
                </Button>
            </Form>
        </Row>
    );
}