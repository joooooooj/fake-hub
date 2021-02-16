import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./components/core/Home"
import Login from "./components/core/Login";
import Register from "./components/core/Register";

export default function Routes() {

    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/home">
                <Home/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/register">
                <Register/>
            </Route>
        </Switch>
    );
}