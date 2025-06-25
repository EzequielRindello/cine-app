import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        color: "#12100D",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Spinner animation="border" variant="danger" />
      <span>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
