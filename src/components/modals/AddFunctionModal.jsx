import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import SuccessModal from "./SuccessModal";

const AddFunctionModal = ({ show, handleClose, directorName }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    price: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleClose();
  };

  return (
    <>
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleSuccessClose}
        message="Function added successfully!"
      />
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="modal-add-function">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>Add Function</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" value={directorName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                min={today}
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
            <Button variant="success" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddFunctionModal;
