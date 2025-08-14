import { Alert } from "react-bootstrap";

const DismissableAlert = ({ type, message }) => {
  if (!message) return null;

  return <Alert variant={type}>{message}</Alert>;
};

export default DismissableAlert;
