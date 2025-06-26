import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
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
