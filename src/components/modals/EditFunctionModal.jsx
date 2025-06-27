import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const EditFunctionModal = ({ show, handleClose, func }) => {
  const [date, setDate] = useState(func.date);
  const [time, setTime] = useState(func.time);
  const [price, setPrice] = useState(func.price);
  const today = new Date().toISOString().split("T")[0];

  const handleEdit = (e) => {
    e.preventDefault();
    // logic to update the function
    alert(`Function updated: ${func.movie.title} on ${date} at ${time} for $${price}`);
    handleClose();
  };

  const handleDelete = () => {
    // logic to delete the function
    alert(`Function deleted: ${func.movie.title} on ${func.date} at ${func.time}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleEdit} className="modal-edit-function">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Edit Function</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              value={func.movie.directorName}
              readOnly
            />
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="edit-modal-button" variant="success" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditFunctionModal;
