import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import PageView from "./PageView";

export default function Wiki(props) {

    const [pages, setPages] = useState();

    useEffect(() => {
        handleGetPages();
    }, []);

    const handleGetPages = () => {
        fetch('/api/page/' + props.match.params.id + '/repository', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPages(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateNewPage = () => {
        props.history.push("/template/repository/" + props.match.params.id + "/new-wiki-page");
    }

    const handleDeletePage = (page) => {
        fetch("/api/page/" + page.id, {
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
            setPages(null);
            handleGetPages();
        }, 500)
    }

    return (
        <div>
            {
                pages && pages.length === 0 &&
                <>
                    <div className="w-100 text-center"
                         style={{'marginTop': '100px'}}>
                        <span className="w-100 mb-2 pt-2 material-icons mr-2">import_contacts</span>
                        <span style={{'fontSize': '26px'}}>Welcome to your wiki page. </span>
                        <br/>
                        <span style={{'fontSize': '18px', 'fontWeight': '200'}}>
                            Wikis provide a place in your repository to lay out the roadmap of your project, show the current
                            status, and document software better, together
                        </span>
                    </div>
                    <div className="w-100 pt-5 text-center pb-5 border-bottom">
                        <Button variant="success" className="text-center" onClick={handleCreateNewPage}>
                            Create the first page</Button>
                    </div>
                </>
            }
            {
                <>
                    {
                        pages && pages.length !== 0 &&
                        pages.map((page, index) => {
                            return <PageView key={index} {...props} page={page} delete={handleDeletePage}/>
                        })
                    }
                    {
                        pages && pages.length !== 0 &&
                        <div className="w-100">
                            <div style={{
                                margin: "0 auto",
                                maxWidth: "1200px",
                                display: "flex"
                            }}>
                                <p style={{'fontSize': '16px'}}>Welcome to your wiki page. </p>
                                <Button variant="success" className="ml-auto btn-sm" onClick={handleCreateNewPage}>New
                                    Page</Button>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
}