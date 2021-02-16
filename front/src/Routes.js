import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/core/Home"
import Login from "./components/core/Login";
import Register from "./components/core/Register";
import Repositories from "./components/repositories/Repositories";
import Repository from "./components/repositories/Repository";
import AddEditRepository from "./components/repositories/AddEditRepository";
import Teams from "./components/teams/Teams";
import Profile from "./components/user/Profile";
import AddEditPage from "./components/wiki/AddEditPage";

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
                    {/* REPOSITORY */}
                    <Route exact path="/template/repositories" component={(props) => <Repositories {...props} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id" component={(props) => <Repository {...props} user={props.user}/>}/>
                    <Route exact path="/template/add/repository" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    <Route exact path="/template/edit/repository/:id" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    {/* TEAMS */}
                    <Route exact path="/template/teams" component={() => <Teams user={props.user}/>}/>
                    {/* WIKI */}
                    <Route exact path="/repository/:id/new-wiki-page" component={(props) => <AddEditPage {...props} user={props.user}/>}/>
                    <Route exact path="/repository/:id/edit-wiki-page/:pageId" component={(props) => <AddEditPage {...props} user={props.user}/>}/>
                </>
            }
        </Switch>
    );
}