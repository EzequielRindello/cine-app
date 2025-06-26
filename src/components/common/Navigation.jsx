import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import reactLogo from "/public/react-logo.png";

const Navigation = () => {
  return (
    <Navbar className="main-navbar" expand="md">
      <Container>
        <Navbar.Brand className="nav-title">
          <img
            src={reactLogo}
            alt="React Logo"
            className="react-logo"
          />
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
              Function
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
