import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;
