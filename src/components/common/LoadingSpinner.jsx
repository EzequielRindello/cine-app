import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div>
      <Spinner className="spinner" animation="border" variant="danger" />
      <span>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
