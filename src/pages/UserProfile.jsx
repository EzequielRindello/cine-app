import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

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
    </Container>
  );
};

export default UserProfile;
