import {Button, Form, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";

export default function ProfileEdit(props) {
    const {register, errors, handleSubmit, reset} = useForm();

    const updateProfile = (data) => {
        console.log(data)
        fetch('/api/user/' + props.userStorage.id + "/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + props.userStorage.token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            reset();
            props.getUser();
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const [newPassword, setNewPassword] = useState("");
    const [firstSubmit, setFirstSubmit] = useState(false);

    const updatePassword = () => {
        setFirstSubmit(true);
        if (newPassword) {
            fetch('/api/user/' + props.userStorage.id + "/", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + props.userStorage.token
                },
                body: JSON.stringify({password:newPassword})
            })
            .then(response => response.json())
            .then(data => {
                setFirstSubmit(false);
                setNewPassword("");
                props.getUser();
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const [files, setFiles] = useState(null);
    const fileRef = useRef(null);

    const handleSaveFiles = () => {
        for (let i = 0; i < files.length; ++i) {
            const formData = new FormData();
            formData.append('name', files[i]);
            formData.append('user', props.userStorage.id);
            fetch('/api/file/', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + props.userStorage.token
                },
                body: formData
            })
                .then(response => response)
                .then((data) => {
                    setFiles(null);
                    fileRef.current.value = ""
                    props.getAvatar();
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    const handleFileChooserChange = (event) => {
        const newFiles = event.target.files;
        setFiles(newFiles);
    };

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    return (
        <div>
            <Form className="mt-5 mb-5 w-50" onSubmit={handleSubmit(updateProfile)}>
                <h3 className="text-left bold pb-3">Edit profile info</h3>
                <Form.Group className="text-left">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text"
                                  name="first_name"
                                  defaultValue={props.user.first_name}
                                  ref={register}
                                  placeholder="Enter first name"/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text"
                                  name="last_name"
                                  defaultValue={props.user.last_name}
                                  ref={register}
                                  placeholder="Enter last name"/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  name="email"
                                  defaultValue={props.user.email}
                                  ref={register({
                                      required:true,
                                      pattern: emailRegex
                                  })}
                                  className={errors.email ? "border border-danger" : ""}
                                  placeholder="Enter email"/>
                    {errors.email &&
                    <div className="text-danger font-weight-bold">
                        Email invalid!
                    </div>
                    }
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                                  name="username"
                                  defaultValue={props.user.username}
                                  ref={register({required:true})}
                                  className={errors.username ? "border border-danger" : ""}
                                  placeholder="Enter username"/>
                    {errors.username &&
                        <div className="text-danger font-weight-bold">
                            Username required!
                        </div>
                    }
                </Form.Group>
                <Button className="btn-success float-right mt-2" type="submit">SAVE CHANGES</Button>
            </Form>
            <Form className="pt-5 mb-5 w-50">
                <Form.Group className="text-left">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password"
                                  name="password"
                                  value={newPassword}
                                  className={!newPassword && firstSubmit ? "border border-danger" : ""}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  placeholder="Enter new password"/>
                    {!newPassword && firstSubmit &&
                    <div className="text-danger font-weight-bold">
                        Password may not be blank!
                    </div>
                    }
                </Form.Group>
                <Button className="btn-success float-right mt-2" onClick={() => updatePassword()}>SAVE NEW PASSWORD</Button>
            </Form>
            <div className="pt-5">
                <Form.Group>
                    <Form.File
                        ref={fileRef}
                        accept=".png, .jpg"
                        onChange={(event) => handleFileChooserChange(event)}
                    />
                </Form.Group>
                <Button variant="primary" className="w-25" onClick={() => handleSaveFiles()}>Upload profile picture</Button>
            </div>
        </div>
    )
}