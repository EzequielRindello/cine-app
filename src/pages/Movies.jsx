import { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import MovieList from "../components/movies/MovieList";
import functionService from "../services/functionService";

const Movies = () => {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await functionService.getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">Movies</h1>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by movie name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form>
      <MovieList movies={filteredMovies} />
    </Container>
  );
};

export default Movies;
