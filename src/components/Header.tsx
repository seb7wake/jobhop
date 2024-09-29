import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { GiJumpingRope } from "react-icons/gi";

const Header = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/" className="fw-bold font-size-xl text-white">
        <GiJumpingRope className="me-2 ms-4" size={32} color="white" />
        JobHop
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="bg-white me-3"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-4">
          <Nav.Link href="/" className="text-white me-3">
            Create
          </Nav.Link>
          <Nav.Link href="/admins/applications" className="text-white">
            Applications
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
