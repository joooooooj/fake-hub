import React, {useEffect, useState} from "react";
import Milestone from "./Milestone";

export default function Milestones(props) {
    const [milestones, setMilestones] = useState();

    useEffect(() => {
        handleGetMilestones();
    }, []);

    const handleGetMilestones = () => {
        fetch('/api/milestone/' + props.match.params.id + '/repo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setMilestones(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDeleteMilestone = (milestone) => {
        fetch("/api/milestone/" + milestone.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
        setTimeout(() => {
            setMilestones(null);
            handleGetMilestones();
        }, 500)
    }

    const handleCloseMilestone = (milestone) => {
        milestone.status = milestone.status === 'Closed' ? 'Open' : 'Closed';
        fetch("/api/milestone/" + milestone.id + '/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + JSON.parse(localStorage.getItem("user")).token
            },
            body: JSON.stringify(milestone)
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
        setTimeout(() => {
            setMilestones(null);
            handleGetMilestones();
        }, 500)
    }

    return (
        <div className='w-100 pt-4'>
            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
                {
                    milestones &&
                    milestones.map((milestone, index) => {
                        return <Milestone
                            key={milestone.id}
                            {...props}
                            milestone={milestone}
                            delete={handleDeleteMilestone}
                            close={handleCloseMilestone}
                        />
                    })
                }
            </div>
        </div>
    );
}