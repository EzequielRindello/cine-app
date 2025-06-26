import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton closeVariant="white">
      <Modal.Title>Success</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      The function was added successfully.
      <br />
      <br />
      <Button variant="danger" onClick={handleClose}>
        OK
      </Button>
    </Modal.Body>
  </Modal>
);

export default SuccessModal;
