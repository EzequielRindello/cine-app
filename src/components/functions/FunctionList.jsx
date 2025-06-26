import { Row, Col } from "react-bootstrap";
import FunctionCard from "./FunctionCard";
import LoadingSpinner from "../common/LoadingSpinner";

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
