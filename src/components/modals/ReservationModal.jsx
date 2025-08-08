import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import * as reservationService from "../../services/reservationsService";

const ReservationModal = ({ show, handleClose, func }) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ticketQuantity > func.availableSeats) {
      setError(`Only ${func.availableSeats} seats available`);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const reservationData = {
        movieFunctionId: func.id,
        ticketQuantity: parseInt(ticketQuantity),
      };

      await reservationService.createReservation(reservationData);
      setSuccess("Reservation created successfully!");

      setTimeout(() => {
        handleClose();
        setSuccess("");
        setTicketQuantity(1);
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message);
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
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

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
