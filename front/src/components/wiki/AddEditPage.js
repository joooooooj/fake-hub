import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AddEditPage(props) {
    const {register, errors, handleSubmit} = useForm();

    const [page, setPage] = useState();
    const [files, setFiles] = useState([]);
    const [pageFiles, setPageFiles] = useState([]);

    const handleFileChooserChange = (event) => {
        const newFiles = event.target.files;
        console.log(newFiles);
        setFiles(newFiles);
    };

    if (props.location.pathname.includes("edit-wiki-page") && !page) {
        fetch("/api/page/" + props.match.params.pageId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPage(data);
                handleGetPageFiles();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleGetPageFiles = () => {
        fetch("/api/file/" + props.match.params.pageId + "/page/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPageFiles(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateNewPage = (data) => {
        data.repository = props.match.params.id;
        if (page) {
            handleEditPage(data);
            props.history.push("/template/repository/" + props.match.params.id);
            return;
        }
        fetch("/api/page/", {
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
        props.history.push("/template/repository/" + props.match.params.id);
    }

    const handleEditPage = (data) => {
        fetch("/api/page/" + page.id + "/", {
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

    const handleSaveFiles = () => {
        for (let i = 0; i < files.length; ++i) {
            const formData = new FormData();
            formData.append('name', files[i]);
            fetch('/api/file/', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token
                },
                body: formData
            })
                .then(response => response)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    const handleReadText = (name) => {
        let text = "";
        fetch(name, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                text = data;
            })
            .catch(error => {
                console.error(error);
            });

        setTimeout(() => {
            return (<p>{text}</p>);
        }, 200);
    }

    return (
        <>
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
            {page &&
            <>
                <Form.Group>
                    <Form.File
                        multiple={true}
                        label="Upload files"
                        accept="application/pdf, .png, .jpg"
                        onChange={(event) => handleFileChooserChange(event)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={() => handleSaveFiles()}>Save files</Button>
            </>
            }
            {
                pageFiles &&
                pageFiles.map((file, index) => {
                    return (
                        <div key={index} className="m-5">
                            {file.name.includes('.png') ?
                                <img key={index} width="500px" height="300px" src={file.name} alt=""/> : <></>}
                            {file.name.includes('.txt') ?
                                handleReadText(file.name) : <></>
                            }
                        </div>
                    );
                })

            }
        </>
    );
}
