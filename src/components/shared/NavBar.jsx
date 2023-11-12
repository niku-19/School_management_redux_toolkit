import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Logo</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/students">
            <Nav.Link>Students</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/teachers">
            <Nav.Link>Teachers</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarComponent;
