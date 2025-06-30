import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import functionService from "../../services/functionService";
import LoadingSpinner from "../common/LoadingSpinner";
import FunctionModal from "../modals/FunctionModal";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await functionService.getMovieFunctions(id);
        setMovieData(res);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(`/movies`);
  };

  const handleAddFunction = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              src={movieData.movie.poster}
              alt={movieData.movie.title}
              className="h-100 w-100 object-fit-cover"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              <div>
                <h1 className="display-4">{movieData.movie.title}</h1>
                <div className="mt-4 fs-5">
                  <p>
                    <strong>Type:</strong> {movieData.movie.type}
                  </p>
                  <p>
                    <strong>Director:</strong> {movieData.movie.directorName}
                  </p>
                  <p>
                    <strong>Description:</strong> {movieData.movie.description}
                  </p>
                  <p>
                    <strong>Functions created:</strong>
                  </p>
                  {movieData.functions.length > 0 ? (
                    <ul>
                      {movieData.functions.map((func) => (
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
                <Button variant="danger" onClick={handleAddFunction}>
                  Add Function
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <FunctionModal
        show={showModal}
        handleClose={handleCloseModal}
        mode="add"
        directorName={movieData.movie.directorName}
      />
    </div>
  );
};

export default MovieDetails;
