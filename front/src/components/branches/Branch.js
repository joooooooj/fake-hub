import React from "react";
import {Button} from "react-bootstrap";

export default function Branch(props) {

    // const handleDeleteTeam = () => {
    //     props.delete(props.team);
    // }
    //
    // const handleEditTeam = () => {
    //     props.edit(props.team);
    // }


    return (
        <div style={{border: '1px solid gray', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
             className="d-flex w-100 mt-1">
            <div className="d-block w-50 text-left p-1">
                <p style={{fontSize: '18px', fontWeight: '400'}}>
                    name: <span style={{color: "white"}}>{props.branch.name}</span>
                </p>
                <p style={{fontSize: '18px', fontWeight: '250'}}>
                    author: <span  style={{fontWeight: '500'}}> {props.branch.author?.username} </span>
                </p>
                <p style={{fontSize: '18px', fontWeight: '250'}}>
                    status: {props.branch.status}
                </p>
                {/*<p style={{fontSize: '18px', fontWeight: '250'}}>*/}
                {/*    tag: {props.commit.tag}*/}
                {/*</p>*/}


            </div>
            {/*<div className="d-block w-50 p-3 position-relative">*/}
            {/*   */}
            {/*    <div className="d-flex position-absolute" style={{bottom: '20px', right: '20px'}}>*/}

            {/*        {JSON.parse(localStorage.getItem("user")).id === props.team.owner.id &&*/}
            {/*        <div>*/}
            {/*            <span className="mr-2">Owned</span>*/}
            {/*            <Button variant="primary" className="ml-auto" onClick={() => handleEditTeam()}>Edit</Button>*/}
            {/*            <Button variant="danger" className="ml-2" onClick={() => handleDeleteTeam()}>Delete</Button>*/}
            {/*        </div>*/}
            {/*        }*/}
            {/*        {JSON.parse(localStorage.getItem("user")).id !== props.team.owner.id &&*/}
            {/*        <div>*/}
            {/*            <Button variant="danger" className="ml-2" onClick={() => handleLeaveTeam()}>Leave</Button>*/}
            {/*        </div>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}