import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFunctions } from "../../contexts/FunctionsContext";
import { MODAL_MODES } from "../../data/cinema.consts";
import SuccessModal from "./SuccessModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const FunctionModal = ({
  show,
  handleClose,
  mode,
  directorName,
  func,
  movieId,
  onSuccess,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState(() => {
  if (mode === MODAL_MODES.EDIT && func) {
    return {
      date: func.date,
      time: func.time,
      price: func.price,
    };
  } else {
    return { date: "", time: "", price: "" };
  }
});


  const { addFunction, editFunction, deleteFunction } = useFunctions();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === MODAL_MODES.ADD) {
        await addFunction(
          movieId,
          formData.date,
          formData.time,
          formData.price
        );
        setSuccessMessage("Function added successfully!");
        setShowSuccessModal(true);
      } else {
        await editFunction({
          ...func,
          date: formData.date,
          time: formData.time,
          price: formData.price,
        });
        setSuccessMessage("Function updated successfully!");
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFunction(func.id);
      setShowDeleteModal(false);
      setSuccessMessage("Function deleted successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleClose();
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleSuccessClose}
        message={successMessage}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
      />

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {mode === MODAL_MODES.ADD ? "Add Function" : "Edit Function"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={
                  mode === MODAL_MODES.ADD ? directorName : func?.movie?.directorName
                }
                disabled
                className="bg-light text-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {mode === MODAL_MODES.EDIT && (
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete
              </Button>
            )}
            <Button variant="success" type="submit">
              {mode === MODAL_MODES.ADD ? "Add" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FunctionModal;
