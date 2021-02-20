import React, {useEffect, useRef, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AddEditIssue(props) {
    const {register, errors, handleSubmit, reset} = useForm();

    const [milestones, setMilestones] = useState([]);
    const [labels, setLables] = useState([]);
    const [members, setMembers] = useState([]);
    const [columns, setColumns] = useState([]);

    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);

    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const difficulties = [
        {value: '1', label: '1 - Piece of cake'},
        {value: '2', label: '2 - One whole birthday cake'},
        {value: '3', label: '3 - Two cakes'},
        {value: '4', label: '4 - Could be managed'},
        {value: '5', label: '5 - Bad things happening if you cross middle'},
        {value: '6', label: '6 - It gets harder'},
        {value: '7', label: '7 - The pain is increasing'},
        {value: '8', label: '8 - I can barely breathe'},
        {value: '9', label: "9 - Basically I'm a dead man"},
        {value: '10', label: "10 - RIP"}
    ]

    useEffect(() => {
        getColumns();
        getLabels();
        getMembers();
        getMilestones();

        if (props.issue) {
            handleGetTaskFiles();
            setSelectedMilestone(milestones.filter(ms => ms.value === props.issue.milestone?.id));
            setSelectedLabels(labels.filter(ms => {
                let labelFound = false;
                props.issue.labels.map(label => {
                    if (label.id === ms.value) {
                        labelFound = true;
                    }
                })
                return labelFound;
            }))
            setSelectedColumn(columns.filter(ms => ms.value === props.issue.column?.id))
            setSelectedDifficulty(difficulties.filter(ms => ms.value == props.issue.difficulty))
            setSelectedMembers(members.filter(ms => {
                let memberFound = false;
                props.issue.members.map(member => {
                    if (member.id === ms.value) {
                        memberFound = true;
                    }
                })
                return memberFound;
            }))
        }
    }, [props.issue])

    const handleAddIssue = (data) => {
        if (data.due_date) {
            data.due_date = data.due_date + 'T00:00:00Z';
        } else {
            data.due_date = null;
        }
        let newData = {
            ...data,
            members: getValues(selectedMembers, true),
            labels: getValues(selectedLabels, true),
            difficulty: getValues(selectedDifficulty, false),
            milestone: getValues(selectedMilestone, false),
            repository: props.repoId,
            column: getValues(selectedColumn, false),
            owner: props.user.id,
            changes: props.issue ?
                props.issue.changes + "Issue " + (props.issue ? "updated " : "created ") + todaysDate() + " by " + props.user.username + "#"
                :
                "Issue " + (props.issue ? "updated " : "created ") + todaysDate() + " by " + props.user.username + "#"
        }
        let methodName = "POST"
        let url = "/api/task/"
        if (props.issue) {
            methodName = "PUT"
            url = "/api/task/" + props.issue.id + "/"
        }
        console.log(newData)
        fetch(url, {
            method: methodName,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + props.user.token
            },
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShowSuccess(true);
                setTimeout(() => {
                    resetForm();
                    setShowSuccess(false);
                    props.setShowIssueForm(false);
                    props.getTasks();
                }, 2000);
                if (files && (methodName === "PUT")) {
                    handleSaveFiles(props.issue.id);
                }
                if (files && (methodName === "POST")) {
                    handleSaveFiles(data.id);
                }
            })
            .catch(error => {
                console.log(error);
                setShowFailed(true);
                setTimeout(() => {
                    setShowFailed(false);
                    props.setShowIssueForm(false);
                }, 2000)
            });
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

    const convertDate = (unparsedDate) => {
        let d = new Date(unparsedDate);

        let date = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear()

        date = (date < 10) ? '0' + date : date;
        month = (month < 10) ? '0' + month : month;

        return year + '-' + month + '-' + date;
    }

    const getColumns = () => {
        fetch('/api/column/' + props.repoId + '/repo', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setColumns(convertToOptionsFormatTwoLabels(data, "id", "project", "name"));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getMilestones = () => {
        fetch('/api/milestone/' + props.repoId + '/repo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setMilestones(convertToOptionsFormat(data, "id", "title"));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getLabels = () => {
        fetch('/api/label/' + props.repoId + '/repo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setLables(convertToOptionsFormat(data, "id", "name"));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getMembers = () => {
        setMembers(convertToOptionsFormat(props.members, "id", "username"))
    }

    const convertToOptionsFormat = (array, value, label) => {
        let options = [];
        array?.forEach((obj) => {
            options.push({value: obj[value], label: obj[label]})
        })
        return options;
    }

    const convertToOptionsFormatTwoLabels = (array, value, label1, label2) => {
        let options = [];
        array?.forEach((obj) => {
            options.push({value: obj[value], label: obj[label1][label2] + " - " + obj[label2]})
        })
        return options;
    }

    const getValues = (selected, isArray) => {
        if (!selected && isArray) {
            return [];
        }

        if (!selected && !isArray) {
            return null;
        }

        let selectedNew = Array.isArray(selected) ?
            selected.filter(sv => sv?.value).map(sv => sv?.value)
            :
            selected?.value;

        if (selectedNew?.length === 0 && isArray) {
            return [];
        }

        if (selectedNew?.length === 0 && !isArray) {
            return null;
        }

        if (selectedNew?.length === 1 && !isArray) {
            return selectedNew[0];
        }

        return selectedNew;
    }

    const resetForm = () => {
        reset();
        setTaskFiles(null);
        props.setSelectedIssue(null);
        setFiles(null);
        setSelectedMembers(null);
        setSelectedDifficulty(null);
        setSelectedColumn(null);
        setSelectedLabels(null);
        setSelectedMilestone(null);
    }

    // FILES

    const [files, setFiles] = useState(null);

    const handleSaveFiles = (id) => {
        for (let i = 0; i < files.length; ++i) {
            const formData = new FormData();
            formData.append('name', files[i]);
            formData.append('task', id);
            fetch('/api/file/', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + props.user.token
                },
                body: formData
            })
                .then(response => response)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    const handleFileChooserChange = (event) => {
        const newFiles = event.target.files;
        console.log(newFiles);
        setFiles(newFiles);
    };

    const [taskFiles, setTaskFiles] = useState(null);

    const handleGetTaskFiles = () => {
        console.log(props.issue.id)
        fetch("/api/file/" + props.issue.id + "/task/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTaskFiles(data)
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Row className={"justify-content-md-left ml-5 add-edit-issue " + (props.showIssueForm ? "visible" : "hidden")}>
            {showSuccess &&
            <Alert className="position-fixed w-25 pl-2 pr-2 pb-3 pt-3 font-weight-bold border-success"
                   style={{zIndex: 2, marginLeft: "500px"}} variant={"success"}>
                Issue {props.issue ? "updated" : "created"}!
            </Alert>
            }
            {showFailed &&
            <Alert className="position-fixed w-25 pl-2 pr-2 pb-3 pt-3 font-weight-bold border-danger"
                   style={{zIndex: 2, marginLeft: "500px"}} variant={"danger"}>
                {props.issue ? "Updating" : "Creating"} issue failed!
            </Alert>
            }
            <Form className="mt-5 mb-5 w-25" onSubmit={handleSubmit(handleAddIssue)}>
                <h3 className="text-left bold pb-3">{props.issue ? "EDIT" : "NEW"} ISSUE</h3>
                <div>
                    { taskFiles &&
                        <>
                            <h5>Files</h5>
                            <ul className="list-unstyled">
                                { taskFiles?.map((file) => {
                                    return (
                                        <li className="text-light"><a href={props.backendUrl + file.name} target="_blank">...{file.name}</a></li>
                                    );
                                })
                                }
                            </ul>
                        </>
                    }
                    <Form.Group>
                        <Form.File
                            multiple={true}
                            accept="application/pdf, .doc, .docx, .txt, image/*, video/*"
                            onChange={(event) => handleFileChooserChange(event)}
                        />
                    </Form.Group>
                </div>
                <Form.Group className="text-left">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                                  name="title"
                                  defaultValue={props.issue?.title ? props.issue.title : ""}
                                  ref={register({required: true})}
                                  className={errors.title ? "border border-danger" : ""}
                                  placeholder="Enter title"/>
                    {errors.title &&
                    <div className="text-danger font-weight-bold">
                        Title required!
                    </div>
                    }
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea"
                                  rows={3}
                                  name="description"
                                  ref={register}
                                  defaultValue={props.issue?.description ? props.issue.description : ""}
                                  className={errors.description ? "border border-danger" : ""}
                                  placeholder="Enter description"/>
                    {errors.description &&
                    <div className="text-danger font-weight-bold">
                        Description required!
                    </div>
                    }
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Due date</Form.Label>
                    <Form.Control type="date"
                                  min={todaysDate()}
                                  defaultValue={props.issue?.due_date ? convertDate(props.issue?.due_date) : ""}
                                  name="due_date"
                                  ref={register}
                                  placeholder="Choose due date"/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Difficulty</Form.Label>
                    <Select
                        value={selectedDifficulty}
                        className="text-dark"
                        isClearable={true}
                        onChange={(selected) => setSelectedDifficulty(selected)}
                        options={difficulties}/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Milestone</Form.Label>
                    <Select
                        className="text-dark"
                        isClearable={true}
                        value={selectedMilestone}
                        onChange={(selected) => setSelectedMilestone(selected)}
                        options={milestones}/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Labels</Form.Label>
                    <Select
                        className="text-dark"
                        value={selectedLabels}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={(selected) => setSelectedLabels(selected)}
                        isMulti
                        options={labels}/>
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Members</Form.Label>
                    <Select
                        className="text-dark"
                        value={selectedMembers}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={(selected) => setSelectedMembers(selected)}
                        isMulti
                        options={members}/>
                </Form.Group>
                <Form.Group className="text-left mb-5">
                    <Form.Label>Columns</Form.Label>
                    <Select
                        className="text-dark"
                        value={selectedColumn}
                        isClearable={true}
                        onChange={(selected) => setSelectedColumn(selected)}
                        options={columns}/>
                </Form.Group>
                <Button className="btn-danger" onClick={() => {
                    resetForm();
                    props.setShowIssueForm(false)
                }}>BACK</Button>
                <Button className="btn-success float-right"
                        type="submit">{props.issue ? "SAVE CHANGES" : "CREATE"}</Button>
            </Form>
        </Row>
    );
}