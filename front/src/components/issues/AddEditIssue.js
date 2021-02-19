import React from "react";
import {Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditIssue(props) {
    const { register, errors, handleSubmit } = useForm();

    const handleAddIssue = (data) => {

    }

    return (
        <Row className="justify-content-md-center">
            <Form className="mt-5 mb-5 w-25" onSubmit={handleSubmit(handleAddIssue)}>
                <h3 className="text-left pb-3">ADD ISSUE</h3>
            </Form>
        </Row>
    );
}