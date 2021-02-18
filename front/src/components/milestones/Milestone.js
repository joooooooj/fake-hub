import React from "react";
import {Button} from "react-bootstrap";

export default function Milestone(props) {

    const handleDeleteMilestone = () => {
        props.delete(props.milestone);
    }

    const handleCloseMilestone = () => {
        props.close(props.milestone);
    }

    const handleEditMilestone = () => {
        props.edit(props.milestone);
    }

    return (
        <div style={{border: '1px solid gray', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
             className="d-flex w-100 mt-3">
            <div className="d-block w-50 text-left p-3">
                <p style={{fontSize: '26px', fontWeight: '500'}}>
                    {props.milestone.title}
                </p>
                <p style={{fontSize: '18px', fontWeight: '200', wordBreak: 'break-all'}}>
                    {props.milestone.description}
                </p>
                <span className="font-weight-bold">Due date : {props.milestone.dueDate}</span>
            </div>
            <div className="d-block w-50 p-3 position-relative">
                <div className="d-flex mr-2 ml-1 mb-4">
                    {
                        props.milestone.labels.map((label, index) => {
                            return (
                                <div key={index} className="text-center mr-2"
                                     style={{
                                         backgroundColor: label.color,
                                         borderRadius: '20px',
                                         maxWidth: '200px',
                                         minWidth: '100px',
                                         height: '30px'
                                     }}>
                                    {label.name}
                                </div>);
                        })
                    }
                </div>
                <div className="d-flex position-absolute" style={{bottom: '20px', right: '20px'}}>
                    <p style={{paddingRight: '148px'}}>Status : {props.milestone.status}</p>
                    <Button variant="primary" className="ml-auto" onClick={() => handleEditMilestone()}>Edit</Button>
                    <Button variant="outline-danger" className="ml-2"
                            onClick={() => handleCloseMilestone()}>{props.milestone.status === 'Open' ? 'Close' : 'Reopen'}</Button>
                    <Button variant="danger" className="ml-2" onClick={() => handleDeleteMilestone()}>Delete</Button>
                </div>
            </div>
        </div>
    );
}