import React from "react";
import {Button} from "react-bootstrap";

export default function Team(props) {

    const handleDeleteTeam = () => {
        props.delete(props.team);
    }

    const handleEditTeam = () => {
        props.edit(props.team);
    }

    const handleLeaveTeam = () =>{
        props.leave(props.team);
    }

    return (
        <div style={{border: '1px solid gray', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
             className="d-flex w-100 mt-3">
            <div className="d-block w-50 text-left p-3">
                <p style={{fontSize: '26px', fontWeight: '500'}}>
                    {props.team.name}
                </p>
            </div>
            <div className="d-block w-50 p-3 position-relative">
                <div className="d-flex mr-2 ml-1 mb-4">
                    {
                        props.team.members.map((member, index) => {
                            return (
                                <div key={index} className="text-center mr-2"
                                     style={{
                                         backgroundColor: "gray",
                                         borderRadius: '20px',
                                         maxWidth: '200px',
                                         minWidth: '100px',
                                         height: '30px'
                                     }}>
                                    {member.username}
                                </div>);
                        })
                    }
                </div>
                <div className="d-flex position-absolute" style={{bottom: '20px', right: '20px'}}>

                    {JSON.parse(localStorage.getItem("user")).id === props.team.owner.id &&
                    <div>
                        <span className="mr-2">Owned</span>
                        <Button variant="primary" className="ml-auto" onClick={() => handleEditTeam()}>Edit</Button>
                        <Button variant="danger" className="ml-2" onClick={() => handleDeleteTeam()}>Delete</Button>
                    </div>
                    }
                    {JSON.parse(localStorage.getItem("user")).id !== props.team.owner.id &&
                    <div>
                        <Button variant="danger" className="ml-2" onClick={() => handleLeaveTeam()}>Leave</Button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}