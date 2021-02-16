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

export default function Routes(props) {

    return (
        <Switch>
            <Route exact path="/">
                <Home user={props.user} />
            </Route>
            <Route exact path="/home">
                <Home user={props.user} />
            </Route>
            {   !props.user &&
                <>
                    <Route exact path="/login" component={() => <Login login={props.login} />}/>
                    <Route exact path="/register" component={Register}/>
                </>
            }
            {   props.user &&
                <>
                    {/* PROFILE */}
                    <Route exact path="/profile/" component={() => <Profile {...props} user={props.user}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/repositories" component={(props) => <Repositories {...props} user={props.user}/>}/>
                    <Route exact path="/repository/:id" component={(props) => <Repository {...props} user={props.user}/>}/>
                    <Route exact path="/add/repository" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    <Route exact path="/edit/repository/:id" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    {/* TEAMS */}
                    <Route exact path="/teams" component={() => <Teams user={props.user}/>}/>
                </>
            }
        </Switch>
    );
}