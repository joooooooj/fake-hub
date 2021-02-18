import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Container } from "react-bootstrap";
import Projects from "../projects/Projects";
import ProfileRepositories from "../user/ProfileRepositories"
import emptyavatar from "../../assets/empty-avatar.jpg";
import Repositories from "../repositories/Repositories";
import Teams from "../teams/Teams";
import ProfileTeams from "./ProfileTeams";


export default function Profile(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {

            fetch('/api/user/' +JSON.parse(localStorage.getItem("user")).id, {
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
       
    }, [])

    return (  
        <div className="profile">
            <div className="left">
                <img className="avatar " src={emptyavatar} alt='' />
                <h2 className="ml-2 mt-4">{user?.first_name} {user?.last_name}</h2>
                <h3 className="ml-2">{user?.username}</h3>
                <h5 className="ml-2">{user?.email}</h5>
            </div>
            <div className="right">
                <Container fluid className="ml-3">
            
                    <Tabs>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Repositories</Tab>
                            <Tab>Teams</Tab>
                        </TabList>
        
                        <TabPanel>
                            <h4>Popular repositories</h4>
                            <h4>xXx contributions in the last year</h4>
                        
                        </TabPanel>
                        <TabPanel>
                            <h2>Repositories</h2>
                            <ProfileRepositories {...props} user={props.user}/>
                        </TabPanel>
                        <TabPanel>
                                <ProfileTeams {...props} user={props.user}/>
                        </TabPanel>
                    </Tabs>
                </Container>
            </div>
        </div>
        );
}