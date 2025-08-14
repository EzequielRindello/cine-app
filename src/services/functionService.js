import {
  ENDPOINTS,
  MOVIE_ORIGIN,
  FUNTION_ERRORS,
} from "../constants/cinema.consts";
import { getAuthHeaders } from "../helpers/httpHelpers";

// API Methods
export const functionService = {
  async getStats() {
    try {
      const [moviesResponse, functionsResponse] = await Promise.all([
        fetch(ENDPOINTS.MOVIES),
        fetch(ENDPOINTS.FUNCTION),
      ]);

      const moviesData = await moviesResponse.json();
      const functionsData = await functionsResponse.json();

      const nationalMovies = moviesData.filter(
        (m) => m.type === MOVIE_ORIGIN.NATIONAL
      );
      const internationalMovies = moviesData.filter(
        (m) => m.type === MOVIE_ORIGIN.INTERNATIONAL
      );

      const uniqueDirectors = new Set();
      moviesData.forEach((movie) => {
        if (movie.director) {
          uniqueDirectors.add(movie.director.id);
        }
      });

      return {
        totalMovies: moviesData.length,
        nationalMovies: nationalMovies.length,
        internationalMovies: internationalMovies.length,
        totalDirectors: uniqueDirectors.size,
        totalFunctions: functionsData.length,
      };
    } catch (error) {
      throw error;
    }
  },

  async getMovies() {
    try {
      const [moviesResponse, functionsResponse] = await Promise.all([
        fetch(ENDPOINTS.MOVIES),
        fetch(ENDPOINTS.FUNCTION),
      ]);

      const moviesData = await moviesResponse.json();
      const functionsData = await functionsResponse.json();

      return moviesData.map((movie) => {
        const functionsCount = functionsData.filter(
          (f) => f.movieId === movie.id
        ).length;

        return {
          ...movie,
          directorName: movie.director?.name,
          nationality: movie.director?.nationality,
          functionsCount,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  async getAllFunctions() {
    try {
      const functionsResponse = await fetch(ENDPOINTS.FUNCTION);
      const functionsData = await functionsResponse.json();

      return functionsData.map((func) => ({
        ...func,
        movie: {
          ...func.movie,
          directorName: func.movie?.director?.name,
          nationality: func.movie?.director?.nationality,
        },
      }));
    } catch (error) {
      throw error;
    }
  },

  async getMovieFunctions(movieId) {
    try {
      const functionsResponse = await fetch(ENDPOINTS.FUNCTION);
      const functionsData = await functionsResponse.json();

      const movieFunctions = functionsData.filter(
        (f) => f.movieId === parseInt(movieId)
      );

      let movie;

      if (movieFunctions.length > 0) {
        movie = movieFunctions[0].movie;
      } else {
        const moviesResponse = await fetch(ENDPOINTS.MOVIES);
        const moviesData = await moviesResponse.json();
        movie = moviesData.find((m) => m.id === parseInt(movieId));
      }

      if (!movie) throw new Error(FUNTION_ERRORS.MOVIE_NOT_FOUND);

      return {
        movie: {
          ...movie,
          directorName: movie.director?.name,
          nationality: movie.director?.nationality,
        },
        functions: movieFunctions,
        canAddMore: await this.canAddMoreFunctions(movieId),
      };
    } catch (error) {
      throw error;
    }
  },

  async canAddMoreFunctions(movieId) {
    try {
      const functionsResponse = await fetch(ENDPOINTS.FUNCTION);
      const functionsData = await functionsResponse.json();

      const movieFunctions = functionsData.filter(
        (f) => f.movieId === parseInt(movieId)
      );

      let movie;

      if (movieFunctions.length > 0) {
        movie = movieFunctions[0].movie;
      } else {
        const moviesResponse = await fetch(ENDPOINTS.MOVIES);
        const moviesData = await moviesResponse.json();
        movie = moviesData.find((m) => m.id === parseInt(movieId));
      }

      if (!movie) return false;

      if (movie.type === MOVIE_ORIGIN.NATIONAL) return true;

      return movieFunctions.length < 8;
    } catch (error) {
      return false;
    }
  },

  async canDirectorAddFunction(directorId, date) {
    try {
      const functionsResponse = await fetch(ENDPOINTS.FUNCTION);
      const functionsData = await functionsResponse.json();

      const directorFunctionsOnDate = functionsData.filter((func) => {
        const funcDate = new Date(func.date).toISOString().split("T")[0];
        const checkDate = new Date(date).toISOString().split("T")[0];
        return (
          func.movie &&
          func.movie.directorId === directorId &&
          funcDate === checkDate
        );
      });

      return directorFunctionsOnDate.length < 10;
    } catch (error) {
      return false;
    }
  },

  async createFunction(movieId, date, time, price) {
    try {
      // check if we can add more functions before creating
      const canAddMore = await this.canAddMoreFunctions(movieId);
      if (!canAddMore) {
        const moviesResponse = await fetch(ENDPOINTS.MOVIES);
        const moviesData = await moviesResponse.json();
        const movie = moviesData.find((m) => m.id === parseInt(movieId));

        if (movie?.type === MOVIE_ORIGIN.INTERNATIONAL) {
          throw new Error(FUNTION_ERRORS.INTERNATIONAL_MOVIE_LIMIT);
        }
        throw new Error(FUNTION_ERRORS.MOVIE_LIMIT);
      }

      // get movie info to check director limit
      const moviesResponse = await fetch(ENDPOINTS.MOVIES);
      const moviesData = await moviesResponse.json();
      const movie = moviesData.find((m) => m.id === parseInt(movieId));

      if (!movie) throw new Error(FUNTION_ERRORS.MOVIE_NOT_FOUND);

      const canDirectorAdd = await this.canDirectorAddFunction(
        movie.directorId,
        date
      );
      if (!canDirectorAdd) {
        throw new Error(FUNTION_ERRORS.DIRECTOR_FUNCTION_LIMIT);
      }

      const newFunction = {
        movieId: parseInt(movieId),
        date,
        time,
        price: parseFloat(price),
      };

      const response = await fetch(ENDPOINTS.FUNCTION, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          movieId: parseInt(movieId),
          date: new Date(date).toISOString(),
          time: time.length === 5 ? `${time}:00` : time,
          price: parseFloat(price),
          totalCapacity: 50,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
        } else if (response.status === 404) {
          throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
        } else {
          throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
        }
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async updateFunction(updatedFunction) {
    try {
      const response = await fetch(
        `${ENDPOINTS.FUNCTION}/${updatedFunction.id}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            id: updatedFunction.id,
            movieId: updatedFunction.movieId,
            date: updatedFunction.date,
            time: updatedFunction.time,
            price: parseFloat(updatedFunction.price),
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
        } else if (response.status === 404) {
          throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
        } else {
          throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
        }
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async deleteFunction(id) {
    try {
      const response = await fetch(`${ENDPOINTS.FUNCTION}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
        } else if (response.status === 404) {
          throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
        } else {
          throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
        }
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default functionService;
