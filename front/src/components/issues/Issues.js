import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Form, Row, Table} from "react-bootstrap";
import AddEditIssue from "./AddEditIssue";

export default function Issues(props) {

    const [showIssueForm, setShowIssueForm] = useState(false);
    const [issues, setIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showChanges, setShowChanges] = useState(false);

    useEffect(() => {
        getTasks();
    }, [props.collaborators])

    const getTasks = () => {
        if (props?.repoId) {
            fetch('/api/task/' + props?.repoId + '/repository', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setFilteredTasks(data);
                    setIssues(data);
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    function treatAsUTC(date) {
        let result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }

    function between(startDate, endDate) {
        let millisecondsPerDay = 24 * 60 * 60 * 1000;

        let days = (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
        let hours = days * 24;
        let minutes = hours * 60;
        let seconds = minutes * 60;
        if (days >= 1) {
            return Math.round(days) + " days ";
        } else if (hours >= 1) {
            return Math.round(hours) + " hours ";
        } else if (minutes >= 1) {
            return Math.round(minutes) + " minutes ";
        } else if (seconds >= 1) {
            return Math.round(seconds) + " seconds ";
        } else {
            return "xxx time "
        }


    }

    const todaysDate = () => {
        let d = new Date();

        let date = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear()

        date = (date < 10) ? '0' + date : date;
        month = (month < 10) ? '0' + month : month;

        return year + '-' + month + '-' + date;
    }

    const closeIssue = (task) => {
        fetch("/api/task/" + task.id + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + props.user.token
            },
            body: JSON.stringify(
                {
                    status: "Closed",
                    closed_at: todaysDate() + 'T00:00:00Z',
                    changes: (task.changes ? task.changes + "#" : "") + "Issue closed " + todaysDate() + " by " + props.user.username + "#"
                })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getTasks()
            })
            .catch(error => {
                console.log(error)
                getTasks()
            });
    }

    const openIssue = (task) => {
        fetch("/api/task/" + task.id + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + props.user.token
            },
            body: JSON.stringify(
                {
                    status: "Open",
                    closed_at: todaysDate() + 'T00:00:00Z',
                    changes: (task.changes ? task.changes + "#" : "") + "Issue reopened " + todaysDate() + " by " + props.user.username + "#"
                })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getTasks()
            })
            .catch(error => {
                console.log(error)
                getTasks()
            });
    }

    const [filteredTasks, setFilteredTasks] = useState([]);

    const search = (value) => {
        let filtered = [];
        issues.map((issue) => {
            if ((issue.title + " " + issue.owner.username + " " + issue.status).includes(value)){
                filtered.push(issue);
            }
        })
        setFilteredTasks(filtered);
    }

    return (
        <div className="issues">
            <AddEditIssue setSelectedIssue={setSelectedIssue}
                          backendUrl={props.backendUrl}
                          issue={selectedIssue}
                          getTasks={getTasks}
                          user={props.user}
                          repoId={props.repoId}
                          members={props.collaborators}
                          setShowIssueForm={setShowIssueForm}
                          showIssueForm={showIssueForm}/>
            <div className={showIssueForm ? "hidden" : "visible"}>
                <div className="row container-fluid mb-3">
                    <div className="col-8">
                        <Form.Control onChange={(event) => search(event.target.value)} className="mt-2 mb-3 w-25" type="text" placeholder="Search"/>
                    </div>
                    <div className="col-4 add-new">
                        <Button className="btn-warning" onClick={() => {
                            setShowChanges(!showChanges);
                        }}>{showChanges ? "HIDE" : "SHOW"} ACTIVITY</Button>
                        <Button className="btn-success ml-5" onClick={() => {
                            setSelectedIssue(null);
                            setShowIssueForm(true)
                        }}>NEW</Button>
                    </div>
                </div>
                <Table striped hover>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTasks.map((task) => {
                        return (
                            <tr>
                                <td className="issue">
                                    <div className="row">
                                        <span
                                            className={"material-icons mr-2 " + (task.status === "Open" ? "text-success" : "text-danger")}>error_outline</span>
                                        <span className="issue-title">{task.title}</span>
                                        {task.labels.map((label) => {
                                            return (
                                                <span style={{backgroundColor: label.color}}
                                                      className="text-white ml-2 pl-2 pr-2 pt-1 pb-2 align-middle label">{label.name}</span>
                                            );
                                        })
                                        }
                                    </div>
                                    <div className="row issue-info">
                                        #{task.id} {task.status === "Open" ? "opened" : "closed"} {between(treatAsUTC(task.created_at), treatAsUTC(Date.now()))} ago
                                        by {task.owner.username}
                                        {task.milestone &&
                                        <>
                                            <span className="material-icons">outlined_flag</span>
                                            {task.milestone.title}
                                        </>
                                        }
                                    </div>
                                    {showChanges &&
                                        <>
                                            <div className="row issue-info text-primary">
                                                <span>ACTIVITY</span>
                                            </div>
                                            <div className="row issue-info text-primary">
                                                <ul className="list-unstyled">
                                                    {task.changes?.split("#").map((text) => {
                                                        return (
                                                            <li>{text}</li>
                                                        );
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </td>
                                <td className="button-td">
                                    <Button className="btn-primary" onClick={() => {
                                        setSelectedIssue(task);
                                        setShowIssueForm(true);
                                    }}>
                                        EDIT
                                    </Button>
                                </td>
                                <td className="button-td">
                                    <Button className={task.status === "Open" ? "btn-danger" : "btn-success"}
                                            onClick={() => {
                                                task.status === "Open" ? closeIssue(task) : openIssue(task);
                                            }}>{task.status === "Open" ? "CLOSE" : "OPEN"}</Button>
                                </td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}