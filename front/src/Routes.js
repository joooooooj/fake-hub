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

export default function Routes(props) {

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
                    <Route exact path="/template/register" component={Register}/>
                </>
            }
            {   props.user &&
                <>
                    {/* PROFILE */}
                    <Route exact path="/template/profile" component={(props) => <Profile {...props} user={props.user}/>}/>
                    <Route exact path="/template/profileRepos/" component={() => <ProfileRepositories {...props} user={props.user}/>}/>
                    <Route exact path="/template/settings/" component={() => <Settings {...props} user={props.user}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/template/repositories" component={(props) => <Repositories {...props} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id" component={(props) => <Repository {...props} user={props.user}/>}/>
                    <Route exact path="/template/newRepository" component={() => <NewRepo/>}/>
                    {/* TEAMS */}
                    <Route exact path="/template/teams" component={() => <Teams user={props.user}/>}/>

                    {/* WIKI */}
                    <Route exact path="/template/repository/:id/new-wiki-page" component={(props) => <AddEditPage {...props} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id/edit-wiki-page/:pageId" component={(props) => <AddEditPage {...props} user={props.user}/>}/>
                    {/* PROJECT */}
                    <Route exact path="/template/repository/:id/new-project" component={(props) => <AddEditProject {...props} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id/project/:id2" component={(props) => <Project {...props} user={props.user}/>}/>
                </>
            }
        </Switch>
    );
}