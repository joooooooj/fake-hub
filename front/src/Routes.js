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
import ProfileRepositories from "./components/user/ProfileRepositories";
import Settings from "./components/repositories/Settings";
import NewRepo from "./components/repositories/NewRepo";

export default function Routes(props) {

    return (
        <Switch>
            <Route exact path="/">
                <Home user={props.user} />
            </Route>
<<<<<<< HEAD
            <Route exact path="/home">
=======
            <Route exact path="/template/home">
>>>>>>> a1a6fb8c51528c400e04dfc640f8d82a4c29813f
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
<<<<<<< HEAD
                    <Route exact path="/profile/" component={() => <Profile {...props} user={props.user}/>}/>
                    <Route exact path="/profileRepos/" component={() => <ProfileRepositories {...props} user={props.user}/>}/>
                    <Route exact path="/settings/" component={() => <Settings {...props} user={props.user}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/repositories" component={(props) => <Repositories {...props} user={props.user}/>}/>
                    <Route exact path="/repository/:id" component={(props) => <Repository {...props} user={props.user}/>}/>
                    <Route exact path="/add/repository" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    <Route exact path="/edit/repository/:id" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    <Route exact path="/newRepository" component={() => <NewRepo/>}/>
                    {/* TEAMS */}
                    <Route exact path="/teams" component={() => <Teams user={props.user}/>}/>
=======
                    <Route exact path="/template/profile" component={(props) => <Profile {...props} user={props.user}/>}/>
                    {/* REPOSITORY */}
                    <Route exact path="/template/repositories" component={(props) => <Repositories {...props} user={props.user}/>}/>
                    <Route exact path="/template/repository/:id" component={(props) => <Repository {...props} user={props.user}/>}/>
                    <Route exact path="/template/add/repository" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    <Route exact path="/template/edit/repository/:id" component={(props) => <AddEditRepository {...props} user={props.user}/>}/>
                    {/* TEAMS */}
                    <Route exact path="/template/teams" component={() => <Teams user={props.user}/>}/>
>>>>>>> a1a6fb8c51528c400e04dfc640f8d82a4c29813f
                </>
            }
        </Switch>
    );
}