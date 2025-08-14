import { useEffect, useState } from "react";
import { Alert, Card, Button } from "react-bootstrap";
import * as reservationService from "../../services/reservationsService";
import { canModifyReservation } from "../../helpers/reservationHelpers.js";
import ReservationModal from "../modals/ReservationModal";
import DeleteItemModal from "../modals/DeleteItemModal";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReservation, setEditingReservation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  useEffect(() => {
    loadMyReservations();
  }, []);

  const loadMyReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getMyReservations();
      setReservations(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reservation) => {
    const functionDateTime = new Date(reservation?.movieFunction?.date || 0);
    if (functionDateTime <= new Date()) {
      setError("Cannot modify reservations for past functions");
      return;
    }
    setEditingReservation(reservation);
  };

  const handleUpdateSuccess = () => {
    setEditingReservation(null);
    loadMyReservations();
  };

  const confirmCancel = (reservation) => {
    setReservationToCancel(reservation);
    setShowDeleteModal(true);
  };

  const handleCancel = async () => {
    try {
      if (reservationToCancel?.id) {
        await reservationService.cancelReservation(reservationToCancel.id);
      }
      setShowDeleteModal(false);
      setReservationToCancel(null);
      await loadMyReservations();
      setError("");
    } catch (err) {
      setError(err.message || "Failed to cancel reservation");
    }
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {(reservations || []).length === 0 ? (
        <Alert variant="info">You don't have any reservations yet.</Alert>
      ) : (
        (reservations || []).map((reservation, index) => (
          <Card key={reservation.id || index} className="mb-3">
            <Card.Body>
              <Card.Title>
                {reservation.movieFunction?.movie?.title || "Unknown Movie"}
              </Card.Title>
              <Card.Text>
                <strong>Date:</strong>{" "}
                {reservation.movieFunction?.date
                  ? new Date(
                      reservation.movieFunction.date
                    ).toLocaleDateString()
                  : "-"}
                <br />
                <strong>Time:</strong> {reservation.movieFunction?.time || "-"}
                <br />
                <strong>Tickets:</strong> {reservation.ticketQuantity || 0}
                <br />
                <strong>Total Paid:</strong> ${reservation.totalAmount || 0}
                <br />
                <strong>Reserved on:</strong>{" "}
                {reservation.reservationDate
                  ? new Date(reservation.reservationDate).toLocaleDateString()
                  : "-"}
              </Card.Text>

              {canModifyReservation(reservation) ? (
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
              ) : (
                <Alert variant="info" className="mt-2 mb-0">
                  This reservation cannot be modified (function is too soon or
                  already passed)
                </Alert>
              )}
            </Card.Body>
          </Card>
        ))
      )}
      {editingReservation && (
        <ReservationModal
          show={true}
          onHide={() => setEditingReservation(null)}
          reservation={editingReservation}
          movieFunction={editingReservation?.movieFunction}
          onSuccess={handleUpdateSuccess}
        />
      )}
      {showDeleteModal && (
        <DeleteItemModal
          show={true}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={handleCancel}
          item={reservationToCancel}
        />
      )}
    </>
  );
};

export default MyReservations;
