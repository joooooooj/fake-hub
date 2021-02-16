import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import {Button} from 'react-bootstrap';

export default function ProfileRepositories(props){

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        console.log(props)
        fetch('http://localhost:8000/repository/'+props.user.id+'/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setRepositories(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <>
            <div className="w-100" style={{height: '50px'}}>
                <Link to="/newRepository">
                    <Button variant="success" className="float-right" >
                            <span className="material-icons mr-2"></span>
                            New
                    </Button>
                </Link>
            </div>
            <ListGroup  >
                {
                            repositories?.map((repo, index) => {
                                return (
                                    < ListGroup.Item className="font-weight-bold" key={index}>
                                        <Link to={"/repository/" + repo.id}>{(repo.team ? repo.team.name : repo.owner?.username)} / {repo.name}</Link>
                                    </ListGroup.Item>
                                )
                                
                            })
                        }
            </ListGroup>
        </>
    );
}