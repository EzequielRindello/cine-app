import { useState, useEffect } from "react";
import { Alert, Card, Button, Modal, Form } from "react-bootstrap";
import * as reservationService from "../../services/reservationsService";
import { renderTicketOptions } from "../../helpers/ticketHelpers.jsx";
import { canModifyReservation } from "../../helpers/reservationHelpers.js";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [newTicketQuantity, setNewTicketQuantity] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  useEffect(() => {
    loadMyReservations();
  }, []);

  const loadMyReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getMyReservations();
      setReservations(data);
      setError("");
    } catch (err) {
      setError("Failed to load reservations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reservation) => {
    const functionDateTime = new Date(reservation.movieFunction.date);
    const today = new Date();

    if (functionDateTime <= today) {
      setError("Cannot modify reservations for past functions");
      return;
    }

    setEditingReservation(reservation);
    setNewTicketQuantity(reservation.ticketQuantity);
    setShowModal(true);
    setError("");
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        movieFunctionId: editingReservation.movieFunction?.id,
        ticketQuantity: Number(newTicketQuantity),
        reservationDate: editingReservation.reservationDate,
        totalAmount:
          editingReservation.movieFunction?.price * Number(newTicketQuantity),
      };

      await reservationService.updateReservation(
        editingReservation.id,
        updateData
      );
      setShowModal(false);
      setEditingReservation(null);
      await loadMyReservations();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async () => {
    try {
      await reservationService.cancelReservation(reservationToCancel.id);
      await loadMyReservations();
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setShowCancelModal(false);
      setReservationToCancel(null);
    }
  };

  const confirmCancel = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {reservations.length === 0 ? (
        <Alert variant="info">You don't have any reservations yet.</Alert>
      ) : (
        <>
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="mb-3">
              <Card.Body>
                <Card.Title>
                  {reservation.movieFunction?.movie?.title}
                </Card.Title>
                <Card.Text>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    reservation.movieFunction?.date
                  ).toLocaleDateString()}
                  <br />
                  <strong>Time:</strong> {reservation.movieFunction?.time}
                  <br />
                  <strong>Tickets:</strong> {reservation.ticketQuantity}
                  <br />
                  <strong>Total Paid:</strong> ${reservation.totalAmount}
                  <br />
                  <strong>Reserved on:</strong>{" "}
                  {new Date(reservation.reservationDate).toLocaleDateString()}
                </Card.Text>
                {canModifyReservation(reservation) && (
                  <div className="mt-3">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(reservation)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmCancel(reservation)}
                    >
                      Cancel Reservation
                    </Button>
                  </div>
                )}
                {!canModifyReservation(reservation) && (
                  <Alert variant="info" className="mt-2 mb-0">
                    This reservation cannot be modified (function is too soon or
                    already passed)
                  </Alert>
                )}
              </Card.Body>
            </Card>
          ))}
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingReservation && (
            <>
              <div className="mb-3">
                <h5>{editingReservation.movieFunction?.movie?.title}</h5>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    editingReservation.movieFunction?.date
                  ).toLocaleDateString()}
                  <br />
                  <strong>Time:</strong>{" "}
                  {editingReservation.movieFunction?.time}
                  <br />
                  <strong>Available Seats:</strong>{" "}
                  {editingReservation.movieFunction?.availableSeats +
                    editingReservation.ticketQuantity}
                  <br />
                  <strong>Price per ticket:</strong> $
                  {editingReservation.movieFunction?.price}
                </p>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Select
                  value={newTicketQuantity}
                  onChange={(e) => setNewTicketQuantity(e.target.value)}
                >
                  {renderTicketOptions(
                    editingReservation.movieFunction?.availableSeats +
                      editingReservation.ticketQuantity
                  )}
                </Form.Select>
              </Form.Group>
              <div className="mb-3">
                <strong>
                  New Total: $
                  {(
                    editingReservation.movieFunction?.price * newTicketQuantity
                  ).toFixed(2)}
                </strong>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Reservation
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this reservation? <br />
          <strong>This action cannot be undone.</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No, go back
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Yes, cancel reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyReservations;
