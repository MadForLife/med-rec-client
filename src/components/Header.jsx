import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import keycloak from "../keycloak/KeycloakConfig";

function Header({ roles, username }) {
  const keycloakAccountUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/account`;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MedicalRecord</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          {roles.includes("mr_doctor") && (
            <Nav.Link href="#patients">Patients</Nav.Link>
          )}
        </Nav>
        <Nav>
          {/* Account link with username */}
          <Nav.Link href={keycloakAccountUrl} target="_blank">
            Account {username}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
