import { Modal, Button } from "react-bootstrap";

const DeleteUserModal = ({ show, onHide, onConfirm, user }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Are you sure you want to delete{" "}
        <strong>
          {user?.firstName} {user?.lastName}
        </strong>
        ? This action cannot be undone.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteUserModal;
