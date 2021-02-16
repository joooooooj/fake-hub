import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Container } from "react-bootstrap";
import Projects from "../projects/Projects";


export default function Profile(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (props?.match?.params?.id) {
            fetch('http://localhost:8000/user/' + props.match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [props?.match?.params.id])

    return (  
        <div className="profile">
            <div className="left">
                <img class="avatar" src="./25231.png" />
            </div>
            <div className="right">
                <Container fluid className="ml-3">
            
                    <Tabs>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Repositories</Tab>
                            <Tab>Projects</Tab>
                        </TabList>
        
                        <TabPanel>
                            <h2>Popular repositories</h2>
                            <h2>xXx contributions in the last year</h2>
                        
                        </TabPanel>
                        <TabPanel>
                            <h2>Repositories</h2>
                    
                        </TabPanel>
                        <TabPanel>
                            <h2>Project</h2>
                            <Projects/>
                        </TabPanel>
                    </Tabs>
                </Container>
            </div>
        </div>
        );
}