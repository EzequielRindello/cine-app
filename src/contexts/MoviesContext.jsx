import { createContext, useContext, useEffect, useState } from "react";
import { functionService } from "../services/functionService";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await functionService.getMovies();
    setMovies(data);
  };

  const handleAddMovie = (newMovie) => {
    setMovies((prev) => [...prev, newMovie]);
  };

  const handleEditMovie = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        fetchMovies,
        handleAddMovie,
        handleEditMovie,
        handleDeleteMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
