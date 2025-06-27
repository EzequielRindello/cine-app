import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import EditFunctionModal from "../modals/EditFunctionModal";

const FunctionCard = ({ func }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{func.movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 mt-2">
            {func.movie.directorName} - {func.date} {func.time}
          </Card.Subtitle>
          <Card.Text>Price: ${func.price}</Card.Text>
          <Button variant="danger" onClick={handleClick}>
            Manage Function
          </Button>
        </Card.Body>
      </Card>
      <EditFunctionModal
        show={showModal}
        handleClose={handleClose}
        func={func}
      />
    </>
  );
};

export default FunctionCard;
