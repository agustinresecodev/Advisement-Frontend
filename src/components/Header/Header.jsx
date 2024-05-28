import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../components/Slicers/userSlicer";
import { Navigate, useNavigate } from "react-router-dom";
import "./Header.css";
export const Header = () => {
  //navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //read the user data from the store
  const userData = useSelector(getUserData);

  console.log(userData);
  //logout function
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" id="navigation-bar">
      <Container>
        <Navbar.Brand href="/">AdviseMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {userData.token === "" ? (
              <>
                <Nav.Link className="link" href="/auth/login">
                  LogIn
                </Nav.Link>
                <Nav.Link className="link" href="/auth/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                {(userData.decodificado.userRole === "admin") |
                "administration" ? (
                  <NavDropdown title="Clients" id="basic-nav-dropdown">
                    <NavDropdown.Item className="link" href="/clients">
                      See all Clients
                    </NavDropdown.Item>
                    <NavDropdown.Item className="link" href="/clients/create">
                      Create New Client
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : null}

                <NavDropdown title="Cases" id="basic-nav-dropdown">
                  <NavDropdown.Item className="link" href="/cases">
                    See all Cases
                  </NavDropdown.Item>
                  {(userData.decodificado.userRole === "admin") |
                  "administration" ? (
                    <NavDropdown.Item className="link" href="/cases/create">
                      Create new Case
                    </NavDropdown.Item>
                  ) : null}
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
                {userData.decodificado.userRole === "admin" ? (
                  <>
                    <NavDropdown
                      title="Admin Panel"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item href="/admin">
                        Admin profile
                      </NavDropdown.Item>
                      
                    </NavDropdown>
                  </>
                ) : null}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
