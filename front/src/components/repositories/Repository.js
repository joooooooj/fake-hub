import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Container } from "react-bootstrap";
import Branches from "../branches/Branches";
import Labels from "../labels/Labels";
import Milestones from "../milestones/Milestones";
import Issues from "../issues/Issues";
import Projects from "../projects/Projects";
import Wiki from "../wiki/Wiki";
import 'react-tabs/style/react-tabs.css';

export default function Repository(props) {

    const [repository, setRepository] = useState(null);

    useEffect(() => {
        if (props?.match?.params?.id) {
            fetch('/api/repository/' + props.match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRepository(data);
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [props?.match?.params.id])

    return (
        <Container fluid className="ml-3">
            <Tabs>
                <TabList>
                    <Tab>Branches</Tab>
                    <Tab>Labels</Tab>
                    <Tab>Milestones</Tab>
                    <Tab>Issues</Tab>
                    <Tab>Projects</Tab>
                    <Tab>Wiki</Tab>
                </TabList>

                <TabPanel>
                    <h2>Branches</h2>
                    <Branches/>
                </TabPanel>
                <TabPanel>
                    <h2>Labels</h2>
                    <Labels/>
                </TabPanel>
                <TabPanel>
                    <h2>Milestones</h2>
                    <Milestones/>
                </TabPanel>
                <TabPanel>
                    <h2>Issues</h2>
                    <Issues/>
                </TabPanel>
                <TabPanel>
                    <h2>Projects</h2>
                    <Projects/>
                </TabPanel>
                <TabPanel>
                    <h2>Wiki</h2>
                    <Wiki/>
                </TabPanel>
            </Tabs>
        </Container>
    );
}