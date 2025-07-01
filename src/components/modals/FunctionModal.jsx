import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import SuccessModal from "./SuccessModal";

const FunctionModal = ({show, handleClose, mode, directorName, func, onSuccess,}) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    price: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (mode === "edit" && func) {
      setFormData({
        date: func.date,
        time: func.time,
        price: func.price,
      });
    } else if (mode === "add") {
      setFormData({
        date: "",
        time: "",
        price: "",
      });
    }
  }, [mode, func, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      setShowSuccessModal(true);
    } else {
      alert(
        `Function updated: ${func.movie.title} on ${formData.date} at ${formData.time} for $${formData.price}`
      );
      handleClose();
    }
  };

  const handleDelete = () => {
    alert(
      `Function deleted: ${func.movie.title} on ${func.date} at ${func.time}`
    );
    handleClose();
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleClose();
    if (onSuccess) onSuccess();
  };

  return (
    <>
      {mode === "add" && (
        <SuccessModal
          show={showSuccessModal}
          handleClose={handleSuccessClose}
          message="Function added successfully!"
        />
      )}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className={`modal-${mode}-function`}>
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>
              {mode === "add" ? "Add Function" : "Edit Function"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={
                  mode === "add" ? directorName : func?.movie?.directorName
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {mode === "edit" && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button
              variant="success"
              type="submit"
              className={mode === "edit" ? "edit-modal-button" : ""}
            >
              {mode === "add" ? "Add" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FunctionModal;
