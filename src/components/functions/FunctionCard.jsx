import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { formatFunctionDateTime } from "../../services/formatters";
import FunctionModal from "../modals/FunctionModal";
import ReservationModal from "../modals/ReservationModal";
import { useRole } from "../../hooks/userRole";

const FunctionCard = ({ func }) => {
  const [showModal, setShowModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAdminOrAbove, isUser } = useRole();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token ? true : false);
  }, []);

  const handleManageClick = () => {
    setShowModal(true);
  };

  const handleReserveClick = () => {
    setShowReservationModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleReservationClose = () => {
    setShowReservationModal(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{func.movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 mt-2">
            {func.movie.directorName} - {formatFunctionDateTime(func)}
          </Card.Subtitle>
          <Card.Text>Price: ${func.price}</Card.Text>
          <Card.Text>Available Seats: {func.availableSeats}</Card.Text>

          {isLoggedIn && isAdminOrAbove() && (
            <Button
              variant="warning"
              onClick={handleManageClick}
              className="me-2"
            >
              Manage Function
            </Button>
          )}

          {isLoggedIn && isUser() && func.availableSeats > 0 && (
            <Button variant="primary" onClick={handleReserveClick}>
              Reserve Tickets
            </Button>
          )}
        </Card.Body>
      </Card>

      <FunctionModal
        show={showModal}
        handleClose={handleClose}
        mode="edit"
        func={func}
      />

      <ReservationModal
        show={showReservationModal}
        handleClose={handleReservationClose}
        func={func}
      />
    </>
  );
};

export default FunctionCard;
