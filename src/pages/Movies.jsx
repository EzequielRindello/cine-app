import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useMovies } from "../contexts/MoviesContext";
import MovieList from "../components/movies/MovieList";
import ServerError from "../components/common/ServerError.jsx"

const Movies = () => {
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movies, fetchMovies } = useMovies();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        await fetchMovies();
        setIsLoading(false);
      } catch (error) {
        setError("Error while loading movies. Please try again later.");
        console.error("Error loading movies:", err);
      }finally{
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return (
      <ServerError error= {error}/>
    );
  }

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
