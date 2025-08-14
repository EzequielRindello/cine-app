import { Modal, Button } from "react-bootstrap";

const DeleteItemModal = ({ show, onHide, onConfirm, item }) => {
  if (!item) return null;

  const getItemName = () => {
    if (item.title) return item.title;
    if (item.firstName || item.lastName)
      return `${item.firstName || ""} ${item.lastName || ""}`.trim();
    if (item.name) return item.name;
    return "this item";
  };

  const getItemType = () => {
    return (
      item.type || (item.title ? "Movie" : item.firstName ? "User" : "Item")
    );
  };

  const itemName = getItemName();
  const itemType = getItemType();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong> (
          {itemType})?
        </p>
        <p className="text-muted">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete {itemType}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemModal;
