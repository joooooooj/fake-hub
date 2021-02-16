import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand><img src="./25231-tr.png" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/home" className="nav-link">Why FakeHub?</Link>
                </Nav>
                <Nav className="ml-auto">
                    <Link to="/login" className="nav-link">Sign in</Link>
                    <Link to="/home" className="nav-link">Sign up</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}