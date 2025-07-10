import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="d-flex align-items-center">
      <Spinner className="spinner" animation="border" variant="danger" />
      <span className="ms-2">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
