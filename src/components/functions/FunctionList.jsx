import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import FunctionCard from "./FunctionCard";

const FunctionList = ({ functions }) => {
  if (functions.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <Row>
      {functions.map((func) => (
        <Col key={func.id} sm={12} md={6} lg={4} className="mb-4">
          <FunctionCard func={func} />
        </Col>
      ))}
    </Row>
  );
};

export default FunctionList;
