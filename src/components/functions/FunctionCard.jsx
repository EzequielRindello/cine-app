import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { formatFunctionDateTime } from "../../helpers/formatters";
import ReservationModal from "../modals/ReservationModal";
import FunctionModal from "../modals/FunctionModal";
import { useRole } from "../../hooks/useRole";

const FunctionCard = ({ func }) => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const { isAdminOrAbove, isUser } = useRole();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleReservationSuccess = (quantity) => {
    func.availableSeats -= quantity;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{func.movie?.title || "Unknown Movie"}</Card.Title>
          <Card.Subtitle className="mb-2 mt-2">
            {func.movie?.directorName || "-"} -{" "}
            {formatFunctionDateTime(func) || "-"}
          </Card.Subtitle>
          <Card.Text>Price: ${func.price || 0}</Card.Text>
          <Card.Text>Available Seats: {func.availableSeats || 0}</Card.Text>
          {isLoggedIn && isAdminOrAbove() && (
            <Button
              variant="warning"
              className="me-2"
              onClick={() => setShowManageModal(true)}
            >
              Manage Function
            </Button>
          )}
          {isLoggedIn && isUser() && func.availableSeats > 0 && (
            <Button
              variant="primary"
              onClick={() => setShowReservationModal(true)}
            >
              Reserve Tickets
            </Button>
          )}
        </Card.Body>
      </Card>
      {showManageModal && (
        <FunctionModal
          show={showManageModal}
          handleClose={() => setShowManageModal(false)}
          mode="edit"
          func={func}
        />
      )}
      {showReservationModal && (
        <ReservationModal
          show={showReservationModal}
          onHide={() => setShowReservationModal(false)}
          movieFunction={func}
          reservation={null}
          onSuccess={handleReservationSuccess}
        />
      )}
    </>
  );
};

export default FunctionCard;
