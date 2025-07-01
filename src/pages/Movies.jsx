import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import functionService from "../services/functionService";
import MovieList from "../components/movies/MovieList";

const Movies = () => {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const data = await functionService.getMovies();
      setMovies(data);
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
          onChange={handleFilterChange}
        />
      </Form>
      <MovieList movies={filteredMovies} isLoading={isLoading} />
    </Container>
  );
};

export default Movies;
