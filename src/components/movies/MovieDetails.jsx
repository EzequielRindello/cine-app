import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import functionService from "../../services/functionService";
import { Button, Card, Row, Col } from "react-bootstrap";
import AddFunctionModal from "../modals/AddFunctionModal";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

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
      <Card style={{ minHeight: "300px" }}>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              src={movieData.poster}
              alt={movieData.title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "0.375rem 0 0 0.375rem",
              }}
            />
          </Col>

          <Col md={8}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              <div>
                <h1 className="display-4">{movieData.title}</h1>

                <Card.Text className="mt-4 fs-5">
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
                    <strong>Fuctions created:</strong>
                  </p>
                  <ul>
                    {functionsData.map((func) => (
                      <li key={func.id}>
                        {func.date} at {func.time} - ${func.price}
                      </li>
                    ))}
                    {functionsData.length === 0 && (
                      <p className="fs-6">No functions scheduled yet.</p>
                    )}
                  </ul>
                </Card.Text>
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
