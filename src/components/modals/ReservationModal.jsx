import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import * as reservationService from "../../services/reservationsService";

const ReservationModal = ({
  show,
  handleClose,
  func,
  onReservationSuccess,
}) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ticketQuantity > func.availableSeats) {
      setResponseMessage({
        type: "danger",
        text: `Only ${func.availableSeats} seats available`,
      });
      return;
    }

    try {
      setLoading(true);
      setResponseMessage({ type: "", text: "" });

      const reservationData = {
        movieFunctionId: func.id,
        ticketQuantity: parseInt(ticketQuantity),
      };

      await reservationService.createReservation(reservationData);
      setResponseMessage({
        type: "success",
        text: "Reservation created successfully!",
      });

      if (onReservationSuccess) onReservationSuccess(ticketQuantity);

      setTimeout(() => {
        handleClose();
        setResponseMessage({ type: "", text: "" });
        setTicketQuantity(1);
      }, 2000);

    } catch (err) {
      setResponseMessage({ type: "danger", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = (func.price * ticketQuantity).toFixed(2);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserve Tickets</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {responseMessage.text && (
            <Alert variant={responseMessage.type}>{responseMessage.text}</Alert>
          )}
          <div className="mb-3">
            <h5>{func.movie?.title}</h5>
            <p>
              <strong>Date:</strong> {new Date(func.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {func.time}
            </p>
            <p>
              <strong>Available Seats:</strong> {func.availableSeats}
            </p>
            <p>
              <strong>Price per ticket:</strong> ${func.price}
            </p>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Select
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(e.target.value)}
              disabled={loading}
            >
              {[1, 2, 3, 4].map((num) => (
                <option
                  key={num}
                  value={num}
                  disabled={num > func.availableSeats}
                >
                  {num} ticket{num > 1 ? "s" : ""}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="mb-3">
            <strong>Total Amount: ${totalAmount}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Reservation"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReservationModal;
