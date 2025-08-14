import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import * as reservationService from "../../../services/reservationsService";
import { renderTicketOptions } from "../../../helpers/ticketHelpers.jsx";

const ReservationModal = ({
  show,
  onHide,
  reservation,
  movieFunction,
  onSuccess,
}) => {
  const mode = reservation ? "edit" : "create";
  const currentFunc =
    mode === "edit" ? reservation?.movieFunction : movieFunction;

  if (!currentFunc) return <></>;

  const [ticketQuantity, setTicketQuantity] = useState(
    reservation?.ticketQuantity || 1
  );
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    type: "",
    text: "",
  });
  const [availableSeats, setAvailableSeats] = useState(
    mode === "edit"
      ? (reservation?.movieFunction?.availableSeats || 0) +
          (reservation?.ticketQuantity || 0)
      : movieFunction?.availableSeats || 0
  );

  useEffect(() => {
    setAvailableSeats(
      mode === "edit"
        ? (reservation?.movieFunction?.availableSeats || 0) +
            (reservation?.ticketQuantity || 0)
        : movieFunction?.availableSeats || 0
    );
    setTicketQuantity(reservation?.ticketQuantity || 1);
  }, [reservation, movieFunction, mode]);

  const totalAmount = (currentFunc.price * ticketQuantity).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ticketQuantity > availableSeats) {
      setResponseMessage({
        type: "danger",
        text: `Only ${availableSeats} seats available`,
      });
      return;
    }

    try {
      setLoading(true);
      setResponseMessage({ type: "", text: "" });

      if (mode === "create") {
        await reservationService.createReservation({
          movieFunctionId: movieFunction.id,
          ticketQuantity,
        });
        setResponseMessage({
          type: "success",
          text: "Reservation created successfully!",
        });
      } else {
        await reservationService.updateReservation(reservation.id, {
          movieFunctionId: reservation.movieFunction.id,
          ticketQuantity,
          reservationDate: reservation.reservationDate,
          totalAmount: reservation.movieFunction.price * ticketQuantity,
        });
        setResponseMessage({
          type: "success",
          text: "Reservation updated successfully!",
        });
      }

      if (onSuccess) onSuccess(ticketQuantity);

      setTimeout(() => {
        onHide();
        setTicketQuantity(1);
        setResponseMessage({ type: "", text: "" });
      }, 1500);
    } catch (err) {
      setResponseMessage({
        type: "danger",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={!!show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "edit" ? "Edit Reservation" : "Reserve Tickets"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {responseMessage.text && (
            <Alert variant={responseMessage.type}>{responseMessage.text}</Alert>
          )}
          <div className="mb-3">
            <h5>{currentFunc.movie?.title || "Unknown Movie"}</h5>
            <p>
              <strong>Date:</strong>{" "}
              {currentFunc.date
                ? new Date(currentFunc.date).toLocaleDateString()
                : "-"}{" "}
              <br />
              <strong>Time:</strong> {currentFunc.time || "-"} <br />
              <strong>Available Seats:</strong> {availableSeats} <br />
              <strong>Price per ticket:</strong> ${currentFunc.price || 0}
            </p>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Select
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(Number(e.target.value))}
              disabled={loading || availableSeats === 0}
            >
              {availableSeats > 0
                ? renderTicketOptions(availableSeats)
                : [<option key="0">0</option>]}
            </Form.Select>
          </Form.Group>
          <div className="mb-3">
            <strong>Total Amount: ${totalAmount}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading || availableSeats === 0}
          >
            {loading
              ? "Processing..."
              : mode === "edit"
              ? "Update Reservation"
              : "Confirm Reservation"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReservationModal;
