import React, {useEffect, useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';

export default function Project(props) {

    const [project, setProject] = useState(null);
    const [repository, setRepository] = useState(null);
    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])

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
                            fetch('/api/task/' + data[0].id + '/column', {

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

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: 2,
        width: 250
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    const onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        console.log(source)
        console.log(destination)

        console.log(tasks)

        for (let task of tasks) {
            if (task.id === Number(result.draggableId))
                task.column.id = Number(destination.droppableId)
        }

        console.log(tasks)

    };


    return (


        <div>

            <h2>{project?.name}</h2>
            <h4>repository : {repository?.name}</h4>
            <span>{project?.description}</span>
            <Container>
                <Row>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {columns.map((column, index) => (
                            <div key={column.id}>
                                <div>{column.name}</div>
                            <Droppable droppableId={String(column.id)} >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>

                                        {tasks.map((task, index) => (

                                                task.column.id === column.id &&
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={String(task.id)}
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


                                                                <Col xs={3} md={5} key={index}>
                                                                    <div key={task.id + column.id}>{task.title}</div>
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