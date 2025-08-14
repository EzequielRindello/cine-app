import { useState } from "react";
import { MoviesContext } from "./MoviesContext";
import { functionService } from "../../services/functionService";

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await functionService.getMovies();
    setMovies(data);
  };

  return (
    <MoviesContext.Provider value={{ movies, fetchMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
