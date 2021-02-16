import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Form, Row} from 'react-bootstrap';
import Select from 'react-select';
import {useHistory} from "react-router-dom";

export default function NewRepo(props) {
    const history = useHistory();

    const {register, errors, handleSubmit} = useForm();
    const [options, setOptions] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        fetch(
            'http://localhost:8000/api/user/' +
            JSON.parse(localStorage.getItem('user')).id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(response => response.json())
            .then(data => {
                setUser(data);
                console.log('Success:', data);
                fetch(
                    'http://localhost:8000/api/team/' +
                    JSON.parse(localStorage.getItem('user')).id +
                    '/user',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                    .then(response => response.json())
                    .then(data2 => {
                        console.log('Success:', data2);
                        const options = []
                        options.push({value: "user__selected", label: data.username})
                        for (let d of data2) {
                            options.push({value: d.id, label: d.name})
                        }
                        console.log("options:")
                        console.log(options)
                        setOptions(options)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);

    const createRepo = (data) => {
        console.log(data)
        if (data.owner === "user__selected") {
            data.owner = JSON.parse(localStorage.getItem('user')).id
        } else {
            data.team = Number(data.owner)
            data.owner = null
        }
        data.collaborators = [JSON.parse(localStorage.getItem('user')).id]
        console.log(data)
        fetch('http://localhost:8000/api/repository/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' +
                    JSON.parse(localStorage.getItem('user')).token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                history.push('/home')

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="w-100 text-center">
            <div style={{maxWidth: '1000px', 'margin': '0 auto'}}>


                <div>
                    <Form onSubmit={handleSubmit(createRepo)} className="w-100 d-block"
                          style={{"padding": "0 50px 100px"}}>
                        <Form.Group className="text-left">

                            <div className="w-100 text-left" style={{fontSize: "36px"}}> Create a new repository</div>

                            <div className="w-100 text-left" style={{fontSize: "20px"}}>Repository contains stuff.</div>

                            <Form.Label className="mt-5">Owner</Form.Label>
                            <div className="d-flex" >
                                {options.length > 0 &&
                                <Form.Control as="select" className="w-50 text-dark bg-light"
                                              ref={register({required: true})}
                                              name="owner">
                                    {
                                        options.map((item, index) => {
                                            return (<option key={index} value={item.value} label={item.label}/>)

                                        })
                                    }
                                </Form.Control>
                                }
                                <span style={{fontSize: "20px", marginLeft: "20px"}}>/</span>
                            </div>
                            {errors.owner &&
                            <div className="text-danger font-weight-bold">
                                Owner required!
                            </div>
                            }
                            <Form.Label>Repository name</Form.Label>
                            <Form.Control ref={register({required: true})} type="text"
                                          className="w-50 text-dark bg-light"
                                          style={{'height': '40px', 'borderRadius': '10px', marginTop: '5px'}}
                                          name="name"/>
                            {errors.name &&
                            <div className="text-danger font-weight-bold">
                                Name required!
                            </div>
                            }

                            <Form.Label>Description</Form.Label>
                            <Form.Control  ref={register({})}type="text" className="w-100 text-dark bg-light"
                                          style={{'height': '40px', 'borderRadius': '10px', marginTop: '5px'}}
                                          name="description"/>


                        </Form.Group>
                        <Button variant="submit" type="submit" className="w-50 mt-3">
                            Create repository
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    );
}
