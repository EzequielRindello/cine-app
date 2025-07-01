import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return <p>No movies were found</p>;
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
};

export default MovieList;
