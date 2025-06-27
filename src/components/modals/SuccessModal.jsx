import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, handleClose }) => (
  <Modal className="modal-success" show={show} onHide={handleClose} centered>
    <Modal.Header closeButton closeVariant="white">
      <Modal.Title>Success</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      The function was added successfully.
      <br />
      <br />
      <Button variant="success" onClick={handleClose}>
        OK
      </Button>
    </Modal.Body>
  </Modal>
);

export default SuccessModal;
