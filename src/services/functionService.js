import {
  ENDPOINTS,
  MOVIE_ORIGIN,
  FUNTION_ERRORS,
} from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const functionService = {
  async getStats() {
    const [moviesData, functionsData] = await Promise.all([
      getHttp(ENDPOINTS.MOVIES, "GET", getAuthHeaders()),
      getHttp(ENDPOINTS.FUNCTION, "GET", getAuthHeaders()),
    ]);

    const nationalMovies = moviesData.filter(
      (m) => m.type === MOVIE_ORIGIN.NATIONAL
    );
    const internationalMovies = moviesData.filter(
      (m) => m.type === MOVIE_ORIGIN.INTERNATIONAL
    );
    const uniqueDirectors = new Set(
      moviesData.map((m) => m.director?.id).filter(Boolean)
    );

    return {
      totalMovies: moviesData.length,
      nationalMovies: nationalMovies.length,
      internationalMovies: internationalMovies.length,
      totalDirectors: uniqueDirectors.size,
      totalFunctions: functionsData.length,
    };
  },

  async getMovies() {
    const [moviesData, functionsData] = await Promise.all([
      getHttp(ENDPOINTS.MOVIES, "GET", getAuthHeaders()),
      getHttp(ENDPOINTS.FUNCTION, "GET", getAuthHeaders()),
    ]);

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
  },

  async getAllFunctions() {
    const functionsData = await getHttp(
      ENDPOINTS.FUNCTION,
      "GET",
      getAuthHeaders()
    );
    return functionsData.map((func) => ({
      ...func,
      movie: {
        ...func.movie,
        directorName: func.movie?.director?.name,
        nationality: func.movie?.director?.nationality,
      },
    }));
  },

  async getMovieFunctions(movieId) {
    try {
      const functionsData = await getHttp(ENDPOINTS.FUNCTION);

      const movieFunctions = functionsData.filter(
        (f) => f.movieId === parseInt(movieId)
      );

      let movie;

      if (movieFunctions.length > 0) {
        movie = movieFunctions[0].movie;
      } else {
        const moviesData = await getHttp(ENDPOINTS.MOVIES);
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
      const functionsData = await getHttp(ENDPOINTS.FUNCTION);

      const movieFunctions = functionsData.filter(
        (f) => f.movieId === parseInt(movieId)
      );

      let movie;

      if (movieFunctions.length > 0) {
        movie = movieFunctions[0].movie;
      } else {
        const moviesData = await getHttp(ENDPOINTS.MOVIES);
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
      const functionsData = await getHttp(ENDPOINTS.FUNCTION);

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
      const canAddMore = await this.canAddMoreFunctions(movieId);
      if (!canAddMore) {
        const moviesData = await getHttp(ENDPOINTS.MOVIES);
        const movie = moviesData.find((m) => m.id === parseInt(movieId));

        if (movie?.type === MOVIE_ORIGIN.INTERNATIONAL) {
          throw new Error(FUNTION_ERRORS.INTERNATIONAL_MOVIE_LIMIT);
        }
        throw new Error(FUNTION_ERRORS.MOVIE_LIMIT);
      }

      const moviesData = await getHttp(ENDPOINTS.MOVIES);
      const movie = moviesData.find((m) => m.id === parseInt(movieId));

      if (!movie) throw new Error(FUNTION_ERRORS.MOVIE_NOT_FOUND);

      const canDirectorAdd = await this.canDirectorAddFunction(
        movie.directorId,
        date
      );
      if (!canDirectorAdd) {
        throw new Error(FUNTION_ERRORS.DIRECTOR_FUNCTION_LIMIT);
      }

      return await getHttp(ENDPOINTS.FUNCTION, "POST", getAuthHeaders(), {
        movieId: parseInt(movieId),
        date: new Date(date).toISOString(),
        time: time.length === 5 ? `${time}:00` : time,
        price: parseFloat(price),
        totalCapacity: 50,
      });
    } catch (error) {
      if (error.message.includes("401")) {
        throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
      } else if (error.message.includes("404")) {
        throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
      } else {
        throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
      }
    }
  },

  async updateFunction(updatedFunction) {
    try {
      return await getHttp(
        `${ENDPOINTS.FUNCTION}/${updatedFunction.id}`,
        "PUT",
        getAuthHeaders(),
        {
          id: updatedFunction.id,
          movieId: updatedFunction.movieId,
          date: updatedFunction.date,
          time: updatedFunction.time,
          price: parseFloat(updatedFunction.price),
        }
      );
    } catch (error) {
      if (error.message.includes("401")) {
        throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
      } else if (error.message.includes("404")) {
        throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
      } else {
        throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
      }
    }
  },

  async deleteFunction(id) {
    try {
      await getHttp(`${ENDPOINTS.FUNCTION}/${id}`, "DELETE", getAuthHeaders());
      return true;
    } catch (error) {
      if (error.message.includes("401")) {
        throw new Error(FUNTION_ERRORS.FUNTIONS_PERMISSION);
      } else if (error.message.includes("404")) {
        throw new Error(FUNTION_ERRORS.FUNCTION_NOT_FOUND);
      } else {
        throw new Error(FUNTION_ERRORS.ERROR_FUNCTION);
      }
    }
  },
};

export default functionService;
