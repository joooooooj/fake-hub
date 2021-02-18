import React from "react";
import {Button} from "react-bootstrap";

export default function PageView(props) {

    const handleEditPage = () => {
        props.history.push("/template/repository/" + props.match.params.id + "/edit-wiki-page/" + props.page.id);
    }

    const handleDeletePage = () => {
        props.delete(props.page);
    }
    return (
        <div className="w-100 mt-5 mb-5">
            <div style={{margin: "0 auto", maxWidth: "1200px"}} className="border-bottom d-flex">
                <div className="d-block" style={{maxWidth: "1000px"}}>
                    <h1 style={{fontSize: "26px", fontWeight: "300"}}>{props.page.title}</h1>
                    <p style={{fontSize: "18px", wordBreak: "break-all"}}>{props.page.content}</p>
                </div>
                <div className="d-flex flex-wrap" style={{marginLeft: "auto", maxWidth: "200px"}}>
                    <Button variant="primary" className="mt-3 mr-2" onClick={() => handleEditPage()}>Edit</Button>
                    <Button variant="danger" className="mt-3" onClick={() => handleDeletePage()}>Delete</Button>
                </div>
            </div>
        </div>
    );
}