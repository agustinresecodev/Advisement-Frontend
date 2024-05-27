import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../components/Slicers/userSlicer";
import { Navigate, useNavigate } from "react-router-dom";

export const Header = () => {
  //navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //read the user data from the store
  const userData = useSelector(getUserData);

  console.log(userData)
  //logout function
  const logoutUser = () => {
    
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">AdviseMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {userData.token === "" ? (
              <>
                <Nav.Link href="/auth/login">LogIn</Nav.Link>
                <Nav.Link href="/auth/register">Register</Nav.Link>
              </>
            ) : (
              <>
                {userData.decodificado.userRole === "admin" | "administration" ? (
                  <NavDropdown title="Clients" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/clients">
                    See all Clients
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/clients/create">
                    Create New Client
                  </NavDropdown.Item>
                </NavDropdown>
                ) : (null)
                }
                
                <NavDropdown title="Cases" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/cases">
                    See all Cases
                  </NavDropdown.Item>
                  {userData.decodificado.userRole === "admin" |"administration" ? (<NavDropdown.Item href="/cases/create">
                    Create new Case
                  </NavDropdown.Item>) : null}
                  
                </NavDropdown>

                <NavDropdown
                  title={userData.decodificado.userName}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutUser}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
