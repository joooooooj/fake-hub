import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Team from "../teams/Team";
import Commit from "./Commit";

export default function Commits(props) {

    const [commits, setCommits] = useState();


    useEffect(() => {
        if (props?.match?.params?.id) {
            fetch('/api/commit/' + props.match?.params?.id + '/repo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCommits(data);
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
                    commits &&
                    commits?.map((commit, index) => {
                        return <Commit
                            key={commit.id}
                            {...props}
                            commit={commit}
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