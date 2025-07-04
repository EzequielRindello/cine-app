import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import {formatFunctionDateTime} from "../../services/formatters"
import FunctionModal from "../modals/FunctionModal";

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
            {func.movie.directorName} - {formatFunctionDateTime(func)}
          </Card.Subtitle>
          <Card.Text>Price: ${func.price}</Card.Text>
          <Button variant="danger" onClick={handleClick}>
            Manage Function
          </Button>
        </Card.Body>
      </Card>
      <FunctionModal
        show={showModal}
        handleClose={handleClose}
        mode="edit"
        func={func}
      />
    </>
  );
};

export default FunctionCard;
