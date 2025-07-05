import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Container className="mt-4 text-center">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">No user data available.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h4>User Profile</h4>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <strong>First Name:</strong>
            </Col>
            <Col md={8}>{user.firstName}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>Last Name:</strong>
            </Col>
            <Col md={8}>{user.lastName}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>Email:</strong>
            </Col>
            <Col md={8}>{user.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>ID:</strong>
            </Col>
            <Col md={8}>{user.id}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Button variant="danger m-3" onClick={handleLogout}>logout</Button>
    </Container>
  );
};

export default UserProfile;
