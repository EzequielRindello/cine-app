import { Modal, Button } from "react-bootstrap";

const DeleteMovieModal = ({ show, onHide, onConfirm, movie }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movie && (
          <p>
            Are you sure you want to delete the movie "
            <strong>{movie.title}</strong>"?
            <br />
            <small className="text-muted">This action cannot be undone.</small>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Movie
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMovieModal;
