import { Card, Row, Col } from "react-bootstrap";

const ProfileCard = ({ user }) => {
  return (
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
  );
};

export default ProfileCard;
