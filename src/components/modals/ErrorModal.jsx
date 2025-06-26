import { Modal, Button } from "react-bootstrap";

const ErrorModal = ({
  show,
  onClose,
  message = "An error occurred. Please try again.",
}) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title className="text-danger">Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ErrorModal;
