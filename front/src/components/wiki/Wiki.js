import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import PageView from "./PageView";

export default function Wiki(props) {

    const [pages, setPages] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/api/page/' + props.match.params.id + '/repository', {
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

    }, []);

    const handleCreateNewPage = () => {
        props.history.push("/repository/" + props.match.params.id + "/new-wiki-page");
    }

    return (
        <div>
            {
                pages && pages.length === 0 &&
                <>
                    <div className="w-100 text-center" style={{'marginTop': '100px'}}>S
                        <span className="w-100 mb-2 pt-2 material-icons mr-2">import_contacts</span>
                        <span style={{'fontSize': '26px'}}>Welcome to your wiki page. </span>
                        <br/>
                        <span style={{'fontSize': '18px', 'fontWeight': '200'}}>
                            Wikis provide a place in your repository to lay out the roadmap of your project, show the current
                            status, and document software better, together
                        </span>
                    </div>
                    <div className="w-100 pt-5 text-center">
                        <Button variant="success" className="text-center" onClick={handleCreateNewPage}>
                            Create the first page</Button>
                    </div>
                </>
            }
            {
                pages && pages.length !== 0 &&
                pages.map((page, index) => {
                    return <PageView key={index} {...props} page={page}/>
                })
            }
        </div>
    );
}