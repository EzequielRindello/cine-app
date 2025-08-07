import { useNavigate } from "react-router-dom";
import { Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useRole } from "../hooks/userRole.js";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileCard from "../components/login/ProfileCard.jsx";
import UserManagement from "../components/admin/UserManagement.jsx";
import MyReservations from "../components/user/MyReservations.jsx";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();
  const { isSysAdmin, isCineAdmin, isUser, isAdminOrAbove } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
    alert("You have been logged out successfully.");
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
      <Row>
        <Col md={4}>
          <ProfileCard user={user} />
          <Button variant="danger m-3" onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        <Col md={8}>
          {isSysAdmin() && (
            <div>
              <h3>User Management</h3>
              <UserManagement />
            </div>
          )}

          {isCineAdmin() && (
            <div>
              <h3>CineAdmin Profile</h3>
              <Alert className="mt-3" variant="warning">
                CineAdmin accounts cannot be modified directly. Please contact a
                SysAdmin for any changes.
              </Alert>
            </div>
          )}

          {isUser() && (
            <div>
              <h3>My Reservations</h3>
              <MyReservations />
            </div>
          )}
        </Col>
      </Row>
      {isAdminOrAbove() && (
        <div className="mt-4">
          <h3>Add a movie</h3>
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
