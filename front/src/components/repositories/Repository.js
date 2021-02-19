import React, {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Container} from "react-bootstrap";
import Branches from "../branches/Branches";
import Labels from "../labels/Labels";
import Milestones from "../milestones/Milestones";
import Issues from "../issues/Issues";
import Projects from "../projects/Projects";
import Wiki from "../wiki/Wiki";
import Settings from "../repositories/Settings"
import 'react-tabs/style/react-tabs.css';
import Commits from "../commits/Commits";
import Insights from "../insights/Insights";

export default function Repository(props) {

    const [repository, setRepository] = useState(null);
    const [insights, setInsights] = useState(null);

    useEffect(() => {
        if (props?.match?.params?.id) {

            console.log(props?.match?.params?.id)

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
        <>
            <h2 className={"p-3"}>{repository?.name}</h2>
            <Container fluid className="ml-3">
                <Tabs>
                    <TabList>
                        <Tab>Commits</Tab>
                        <Tab>Branches</Tab>
                        <Tab>Labels</Tab>
                        <Tab>Milestones</Tab>
                        <Tab>Issues</Tab>
                        <Tab>Projects</Tab>
                        <Tab>Wiki</Tab>
                        <Tab>Insights</Tab>
                        <Tab>Settings</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Commits </h2>
                        <Commits {...props} repo={repository}/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Branches</h2>
                        <Branches/>
                    </TabPanel>
                    <TabPanel>
                        <Labels {...props} />
                    </TabPanel>
                    <TabPanel>
                        <Milestones {...props} />
                    </TabPanel>
                    <TabPanel>
                        <Issues/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Projects </h2>
                        <Projects  {...props} repo={repository}/>
                    </TabPanel>
                    <TabPanel>
                        <Wiki {...props}/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Insights</h2>
                        <Insights {...props} repo={repository} insights={insights}/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Settings</h2>
                        <Settings {...props} user={props.user}/>
                    </TabPanel>
                </Tabs>
            </Container>
        </>
    );
}