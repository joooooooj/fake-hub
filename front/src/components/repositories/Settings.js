import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Settings(props) {
    const {register, errors, handleSubmit} = useForm();
    const [repository, setRepository] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (props?.match?.params?.id) {
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
        }
    }, [props?.match?.params.id])

    function deleteRepo() {
        console.log(repository)
        fetch('/api/repository/' + repository.id + '/', {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                setRepository(data);
                console.log('Success:', data);
                history.push('/home')
            })
            .catch(error => {
                console.error('Error:', error);
                history.push('/home')
            });
    }

    const updateRepo = (data) =>{
        repository.name = data.name
        console.log(repository)
        fetch('/api/repository/' + repository.id+'/', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("user")).token,
            }),
            body: JSON.stringify(repository),
        })
            .then(response => response.json())
            .then(data => {
                setRepository(data);
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
                // history.push('/home')
            });
    }

    return (
        <div className="settings">
            <Form onSubmit={handleSubmit(updateRepo)}>
                <Form.Group className="text-left">
                    <Form.Label className="mt-5">Repository name</Form.Label>
                    {repository &&
                    <Form.Control ref={register({required: true})} type="text"
                                  className="w-50 text-dark bg-light"
                                  style={{'height': '40px', 'borderRadius': '10px', marginTop: '5px'}}
                                  name="name"
                                  placeholder={repository.name}/>
                    }
                    {errors.name &&
                    <div className="text-danger font-weight-bold">
                        Name required!
                    </div>
                    }
                </Form.Group>
                <Button variant="submit" type="submit" className="w-50 mt-3">
                    Update name
                </Button>
            </Form>
            <div className="dangerZone">
                <div className="text-left m-1"> Delete this repository</div>
                <div className="text-left m-1">
                    {' '}When you delete a repo, it's forever. Make sure you are sure.
                </div>
                <Button
                    variant="warning mt-5 m-1"
                    className="w-25"
                    onClick={() => deleteRepo()}
                >
                    Delete repository
                </Button>
            </div>
        </div>
    );
}
