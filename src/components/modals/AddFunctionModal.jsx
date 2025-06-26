import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

const AddFunctionModal = ({ show, handleClose, directorName }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    // add logic to create a new function
    // make sure to validate the inputs before proceeding
    // use services to coroborate with exptions:
    // (International films: maximum 8 screenings)
    // National films: unlimited
    // Directors: max. 10 performances per day
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
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddFunctionModal;
