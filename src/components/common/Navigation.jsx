import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import reactLogo from "/react-logo.png";

const Navigation = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAccountClick = () => {
    navigate("/profile");
  };

  return (
    <Navbar className="main-navbar" expand="md">
      <Container>
        <Navbar.Brand className="nav-title" onClick={handleLogoClick}>
          <img src={reactLogo} alt="React Logo" className="react-logo" />
          MOVIEapp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/functions">
              Functions
            </Nav.Link>
            {token ? (
              <Button
                variant="outline-light"
                className="ms-3"
                onClick={handleAccountClick}
              >
                Account
              </Button>
            ) : (
              <Button
                variant="outline-light"
                className="ms-3"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
