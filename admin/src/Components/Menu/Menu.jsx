import React from "react";
import "./Style.css";
import logo from "../../assets/images/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Sidebar from "../Sidebar/Sidebar";

const Menu = () => {
  return (
    <div className="mp-4 mb-3">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary bgColor">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            className="d-inline-block align-top mx-4"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown
              title="Profile"
              id="collapsible-nav-dropdown"
              className="align-item-end"
            >
              <NavDropdown.Item href="">Profile</NavDropdown.Item>
              <NavDropdown.Item href="">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
