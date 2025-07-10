import { useNavigate } from "react-router-dom";
import { Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileCard from "../components/login/ProfileCard.jsx";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();
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
      <ProfileCard user={user} />
      <Button variant="danger m-3" onClick={handleLogout}>
        logout
      </Button>
    </Container>
  );
};

export default UserProfile;
