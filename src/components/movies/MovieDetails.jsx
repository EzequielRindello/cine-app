import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import functionService from "../../services/functionService";
import LoadingSpinner from "../common/LoadingSpinner";
import AddFunctionModal from "../modals/AddFunctionModal";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [functionsData, setFunctionsData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await functionService.getMovieFunctions(id);
        setMovieData(res.movie);
      } catch (err) {
        console.error("Error loading movie:", err.message);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const res = await functionService.getMovieFunctions(id);
        setFunctionsData(res.functions);
      } catch (err) {
        console.error("Error loading functions:", err.message);
      }
    };
    fetchFunctions();
  }, [id]);

  const handleGoBack = () => {
    navigate(`/movies`);
  };

  if (!movieData) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <Card className="min-h-300">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              src={movieData.poster}
              alt={movieData.title}
              className="h-100 w-100 object-fit-cover"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              <div>
                <h1 className="display-4">{movieData.title}</h1>
                <div className="mt-4 fs-5">
                  <p>
                    <strong>Type:</strong> {movieData.type}
                  </p>
                  <p>
                    <strong>Director:</strong> {movieData.directorName}
                  </p>
                  <p>
                    <strong>Description:</strong> {movieData.description}
                  </p>
                  <p>
                    <strong>Functions created:</strong>
                  </p>
                  {functionsData.length > 0 ? (
                    <ul>
                      {functionsData.map((func) => (
                        <li key={func.id}>
                          {func.date} at {func.time} - ${func.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="fs-6">No functions scheduled yet.</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={handleGoBack}
                >
                  Go Back
                </Button>
                <Button variant="danger" onClick={() => setShowModal(true)}>
                  Add Function
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <AddFunctionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        directorName={movieData.directorName}
      />
    </div>
  );
};

export default MovieDetails;
