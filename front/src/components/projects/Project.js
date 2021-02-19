import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';

export default function Project(props) {

    const [project, setProject] = useState(null);
    const [repository, setRepository] = useState(null);
    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])


    const [selected, setSelected] = useState(null)
    
    //newColumn
    const [show2, setShow2] = useState(false);
    const handleCloseColumn = (name) => {
        setShow2(false)
    }
    const handleSaveColumn = (name) => {
        fetch('/api/column/' , {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            },
            body: JSON.stringify({"name": document.getElementById("newColumn").value, "project":props.match?.params?.id2})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShow2(false)
                const cols = columns
                cols.push(data)
                setColumns([])
                setColumns(cols)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleShowColumn = (name) => {
        setShow2(true);
    }
    //

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setSelected(name)
        setShow(true);
    }
    const handleSave = (name) => {
        setShow(false);
        selected.name = document.getElementById("newName").value;
        console.log(selected)
        fetch('/api/column/' + selected?.id + '/', {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            },
            body: JSON.stringify(selected)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    //

    useEffect(() => {
        console.log(props)
        if (props?.match?.params?.id) {

            console.log(props?.match?.params?.id)

            fetch('/api/project/' + props.match.params.id2, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setProject(data);
                    console.log('Success:', data);

                    fetch('/api/column/' + props.match.params.id2 + '/project', {

                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setColumns(data);
                            console.log('Success:', data);
                                fetch('/api/task/' + props.match.params.id + '/repository', {

                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log('Success:', data);

                                        setTasks(data)

                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });


                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    fetch('/api/repository/' + props.match.params.id, {

                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setRepository(data);
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [props?.match?.params.id])

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: 2,
        margin: `0 0 2px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        borderRadius: 5,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: 2,
        width: 190,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    });

    const onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        for (let task of tasks) {
            if (task.id === Number(result.draggableId)) {
                task.column = Number(destination.droppableId)
                const obj={"id":task.id, "column":task.column}
                fetch('/api/task/' + task.id+'/', {

                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
                    },
                    body: JSON.stringify(obj)
                })
                    .then(response => response.json())
                    .then(data => {
                        fetch('/api/task/' + props.match.params.id + '/repository', {

                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);

                                setTasks(data)
                                console.log(tasks)

                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }

        }

        console.log(tasks)

    };

    function deleteColumn(id) {
        fetch('/api/column/' + id, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            }
        })

            .then(data => {
                var index = columns.map(x => {
                    return x.id;
                }).indexOf(id);

                columns.splice(index, 1);
                setColumns([])
                setColumns(columns)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (

        <div className="project">

            <Modal show={show} onHide={handleClose}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit column name</Modal.Title>

                </Modal.Header>
                <Modal.Body><input type="text" id="newName" placeholder={selected?.name}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleCloseColumn}

            >
                <Modal.Header closeButton>
                    <Modal.Title>New column</Modal.Title>

                </Modal.Header>
                <Modal.Body><input type="text" id="newColumn" /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseColumn()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveColumn()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <h2>{project?.name}</h2>
            <h4>repository : {repository?.name}</h4>
            <span>{project?.description}</span>
            <Button variant="success" onClick={() => handleShowColumn()}>
                newColumn
            </Button>
            <Container fluid className="m-5">

                <Row md={8} lg={8}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {columns?.map((column, index) => (
                            <div key={column?.id} className="myColumn">

                                <div className="titleDiv">
                                    <span className="mr-3"> {column?.name}</span>
                                    <div className="x"
                                         onClick={() => deleteColumn(column?.id)}>
                                        x
                                    </div>
                                    <span className="edit"
                                          onClick={() => handleShow(column)}>
                                         <span className="material-icons mr-1">edit</span>
                                    </span>

                                </div>
                                <Droppable droppableId={String(column.id)}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>

                                            {tasks?.map((task, index) => (

                                                task?.column?.id === column?.id &&
                                                <Draggable
                                                    key={task?.id}
                                                    draggableId={String(task?.id)}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>


                                                            <Col md={8} lg={8} key={index}>
                                                                <div key={task?.id + column?.id}>{task?.title}</div>
                                                            </Col>


                                                        </div>
                                                    )}
                                                </Draggable>

                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                            </div>
                        ))}

                    </DragDropContext>
                </Row>

            </Container>
        </div>
    );
}