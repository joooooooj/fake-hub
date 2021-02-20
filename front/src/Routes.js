import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/core/Home"
import Login from "./components/core/Login";
import Register from "./components/core/Register";
import Repositories from "./components/repositories/Repositories";
import Repository from "./components/repositories/Repository";
import Teams from "./components/teams/Teams";
import Profile from "./components/user/Profile";
import ProfileRepositories from "./components/user/ProfileRepositories";
import Settings from "./components/repositories/Settings";
import NewRepo from "./components/repositories/NewRepo";
import AddEditPage from "./components/wiki/AddEditPage";
import AddEditProject from "./components/projects/AddEditProject";
import Project from "./components/projects/Project";
import AddEditTeam from "./components/teams/AddEditTeam";
import AddEditLabel from "./components/labels/AddEditLabel";
import AddEditMilestone from "./components/milestones/AddEditMilestone";
import AddEditIssue from "./components/issues/AddEditIssue";

export default function Routes(props) {

    const backendUrl = "http://localhost:8000";

    return (
        <Switch>
            <Route exact path="/">
                <Home user={props.user} />
            </Route>

            <Route exact path="/template/home">

                <Home user={props.user} />
            </Route>
            {   !props.user &&
                <>
                    <Route exact path="/template/login" component={() => <Login login={props.login} />}/>
                    <Route exact path="/template/register" component={(props) => <Register {...props}/>}/>
                </>
            }
            {   props.user &&
                <>
                    {/* PROFILE */}
                    <Route exact path="/template/profile" component={() => <Profile {...props} backendUrl={backendUrl} user={props.user}/>}/>
                    <Route exact path="/template/profileRepos/" component={() => <ProfileRepositories {...props} user={props.user}/>}/>
                    <Route exact path="/template/settings/" component={() => <Settings {...props} user={props.user}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/template/repositories" component={() => <Repositories user={props.user}/>}/>
                    <Route exact path="/template/repository/:id" component={(params) => <Repository {...params} backendUrl={backendUrl} user={props.user}/>}/>
                    <Route exact path="/template/newRepository" component={() => <NewRepo/>}/>

                    {/* TEAMS */}
                    <Route exact path="/template/teams" component={() => <Teams user={props.user}/>}/>
                    <Route exact path="/template/edit-team/:id/" component={(params) => <AddEditTeam {...params} /> } />
                    <Route exact path="/template/new-team" component={() => <AddEditTeam user={props.user}/> } />

                    {/* WIKI */}
                    <Route exact path="/template/repository/:id/new-wiki-page" component={(params) => <AddEditPage {...params} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id/edit-wiki-page/:pageId" component={(params) => <AddEditPage {...params} user={props.user}/>}/>
                    {/* PROJECT */}
                    <Route exact path="/template/repository/:id/new-project" component={(params) => <AddEditProject {...params} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id/project/:id2" component={(params) => <Project {...params} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id/edit-project/:id2" component={(params) => <AddEditProject {...params} user={props.user}/>}/>
                    {/* LABEL */}
                    <Route exact path="/template/repository/:id/new-label" component={(props) => <AddEditLabel {...props} />} />
                    <Route exact path="/template/repository/:id/edit-label/:labelId" component={(props) => <AddEditLabel {...props} />} />
                    {/* MILESTONE */}
                    <Route exact path="/template/repository/:id/new-milestone" component={(props) => <AddEditMilestone {...props} /> } />
                    <Route exact path="/template/repository/:id/edit-milestone/:milestoneId" component={(props) => <AddEditMilestone {...props} /> } />
                </>
            }
        </Switch>
    );
}