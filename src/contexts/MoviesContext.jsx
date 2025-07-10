import { createContext, useContext, useState } from "react";
import { functionService } from "../services/functionService";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await functionService.getMovies();
    setMovies(data);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        fetchMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
