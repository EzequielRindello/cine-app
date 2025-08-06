import { useState, useEffect } from "react";
import { Table, Alert, Card, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import * as reservationService from "../../services/reservationsService";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [newTicketQuantity, setNewTicketQuantity] = useState(1);
  const { user } = useAuth();

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
        movieFunctionId: editingReservation.movieFunctionId,
        ticketQuantity: parseInt(newTicketQuantity),
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

  const handleCancel = async (reservationId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await reservationService.cancelReservation(reservationId);
        await loadMyReservations();
        setError("");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const canModifyReservation = (reservation) => {
    const functionDateTime = new Date(reservation.movieFunction.date);
    const now = new Date();
    const oneHourBefore = new Date(functionDateTime.getTime() - 60 * 60 * 1000);

    return now < oneHourBefore;
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      {reservations.length === 0 ? (
        <Alert variant="info">You don't have any reservations yet.</Alert>
      ) : (
        <div>
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
                      onClick={() => handleCancel(reservation.id)}
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
        </div>
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
                  {[1, 2, 3, 4].map((num) => {
                    const maxAvailable =
                      editingReservation.movieFunction?.availableSeats +
                      editingReservation.ticketQuantity;
                    return (
                      <option
                        key={num}
                        value={num}
                        disabled={num > maxAvailable}
                      >
                        {num} ticket{num > 1 ? "s" : ""}
                      </option>
                    );
                  })}
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
            Cancel Reservation
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyReservations;
