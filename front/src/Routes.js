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
                <Home token={props.token} />
            </Route>
            <Route exact path="/home">
                <Home token={props.token} />
            </Route>
            {   !props.token &&
                <>
                    <Route exact path="/login" component={() => <Login login={props.login} />}/>
                    <Route exact path="/register" component={Register}/>
                </>
            }
            {   props.token &&
                <>
                    {/* PROFILE */}
                    <Route exact path="/profile" component={(props) => <Profile {...props} token={props.token}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/repositories" component={(props) => <Repositories {...props} token={props.token}/>}/>
                    <Route exact path="/repository/:id" component={(props) => <Repository {...props} token={props.token}/>}/>
                    <Route exact path="/add/repository" component={(props) => <AddEditRepository {...props} token={props.token}/>}/>
                    <Route exact path="/edit/repository/:id" component={(props) => <AddEditRepository {...props} token={props.token}/>}/>
                    {/* TEAMS */}
                    <Route exact path="/teams" component={() => <Teams token={props.token}/>}/>
                </>
            }
        </Switch>
    );
}