import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Team from "../teams/Team";
import Branch from "./Branch";

export default function Branches(props) {

    const [branches, setBranches] = useState();


    useEffect(() => {
        if (props?.match?.params?.id){
            fetch('/api/branch/'+props.match?.params?.id+'/repo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                setBranches(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])


    return (
        <div className='w-100 pt-4'>
            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
                {/*<Button variant="success" className="float-right mb-3"*/}
                {/*        onClick={() => handleCreateNewTeam()}>New</Button>*/}
                {
                    branches &&
                    branches?.map((branch, index) => {
                        return <Branch
                            key={branch.id}
                            {...props}
                            branch={branch}
                            // delete={handleDeleteTeam}
                            // edit={handleEditTeam}
                            // leave={handleLeaveTeam}
                        />
                    })
                }
            </div>
        </div>
    );
}