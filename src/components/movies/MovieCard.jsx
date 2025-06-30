import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {movie.directorName} ({movie.nationality})
        </Card.Subtitle>
        <Card.Text>
          Type: {movie.type} <br />
          Functions: {movie.functionsCount}
        </Card.Text>
        <Button variant="danger" onClick={handleViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
