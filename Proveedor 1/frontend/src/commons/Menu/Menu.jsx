import React from "react";

//
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";

const Menu = ({titleName}) => {
    return (
      <>
        <Navbar collapseOnSelect  expand="sm" bg="dark" variant="dark">
          <Container>
        <Navbar.Brand href="/home">{titleName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/categories">
                    Registrar productos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Gestionar productos
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Categorias" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/categories/register">
                    Registrar categorias
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/manage">
                    Gestionar categorias
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  };
  
  export default Menu;