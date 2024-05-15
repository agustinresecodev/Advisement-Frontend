import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux"
import { getUserData } from "../../components/Slicers/userSlicer";

export const Header = () => {

  const userData = useSelector(getUserData);


  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">AdviseMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Clients" id="basic-nav-dropdown">
              <NavDropdown.Item href="/clients">See all Clients</NavDropdown.Item>
              <NavDropdown.Item href="/clients/create">Create New Client</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cases" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cases">See all Cases</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Create new Case</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={userData.decodificado.userName} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}