import React, {useEffect, useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Droppable, Draggable} from 'react-beautiful-dnd';

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


    return (


        <div>

            <h2>{project?.name}</h2>
            <h4>repository : {repository?.name}</h4>

            <Container>
                <Row>

                    {
                        columns?.map((column, index) => {
                            return (<Col xs={3} md={5} key={index}>
                                {column.name}
                                {

                                    tasks?.map((task, index) => {
                                        return (
                                            

                                            <div>
                                                {task.column.id === column.id &&

                                                <div>{task.title}</div>


                                                }
                                            </div>
                                        )
                                    })



                                }

                            </Col>)
                        })
                    }
                </Row>

            </Container>
        </div>
    );
}