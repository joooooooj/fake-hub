import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SwitchTheme from "./SwitchTheme";
import logo from "../../assets/25231-tr.png";

export default function NavigationBar(props) {

    const [navTheme, setNavTheme] = useState("light");

    return (
        <Navbar collapseOnSelect expand="lg" bg={navTheme} variant={navTheme} className="mb-5">
            <Navbar.Brand><Link to="/template/home"><img src={logo} /></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/template/home" className="nav-link">
                        {!props.user ? "Why FakeHub?" : "Home"}
                    </Link>
                </Nav>
                {!props.user &&
                    <Nav className="ml-auto">
                        <Link to="/template/login" className="nav-link">Sign in</Link>
                        <Link to="/template/register" className="nav-link">Sign up</Link>
                        <SwitchTheme setNavTheme={setNavTheme} setBodyTheme={props.setBodyTheme}/>
                    </Nav>
                }
                {props.user &&
                    <Nav className="ml-auto">
                        <Link to="/template/repositories" className="nav-link">Repositories</Link>
                        <Link to="/template/teams" className="nav-link">Teams</Link>
                        <Link to="/template/profile" className="nav-link">Profile</Link>
                        <Link to="/template/home" className="nav-link" onClick={() => props.logout()}>Sign out</Link>
                        <SwitchTheme setNavTheme={setNavTheme} setBodyTheme={props.setBodyTheme}/>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar >
    );
}