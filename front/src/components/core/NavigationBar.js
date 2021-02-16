import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand><Link to="/home"><img src="./25231-tr.png" /></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/home" className="nav-link">
                        {!props.token ? "Why FakeHub?" : "Home"}
                    </Link>
                </Nav>
                {!props.token &&
                    <Nav className="ml-auto">
                        <Link to="/login" className="nav-link">Sign in</Link>
                        <Link to="/register" className="nav-link">Sign up</Link>
                    </Nav>
                }
                {props.token &&
                    <Nav>
                        <Link to="/repositories" className="nav-link">Repositories</Link>
                        <Link to="/teams" className="nav-link">Teams</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="/home" className="nav-link" onClick={() => props.logout()}>Sign out</Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar >
    );
}