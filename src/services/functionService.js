import { ENDPOINTS, MOVIE_ORIGIN } from "../data/cinema.consts";

// helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

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
      console.error("Error fetching stats:", error);
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
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  async getAllFunctions() {
    try {
      const functionsResponse = await fetch(ENDPOINTS.FUNCTION);
      const functionsData = await functionsResponse.json();

      // Since the API already returns the movie with director info, no need to transform
      return functionsData.map((func) => ({
        ...func,
        movie: {
          ...func.movie,
          directorName: func.movie?.director?.name,
          nationality: func.movie?.director?.nationality,
        },
      }));
    } catch (error) {
      console.error("Error fetching functions:", error);
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

      if (!movie) throw new Error("Movie not found");

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
      console.error("Error fetching movie functions:", error);
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
      console.error("Error checking function limit:", error);
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
      console.error("Error checking director function limit:", error);
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
          throw new Error("This international movie has already reached the limit of 8 functions");
        }
        throw new Error("Cannot add more functions for this movie");
      }

      // get movie info to check director limit
      const moviesResponse = await fetch(ENDPOINTS.MOVIES);
      const moviesData = await moviesResponse.json();
      const movie = moviesData.find((m) => m.id === parseInt(movieId));
      
      if (!movie) throw new Error("Movie not found");

      const canDirectorAdd = await this.canDirectorAddFunction(
        movie.directorId,
        date
      );
      if (!canDirectorAdd) {
        throw new Error(
          `Director ${movie.director?.name} already has 10 functions scheduled for ${date}`
        );
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
        body: JSON.stringify(newFunction),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("You don't have permission to add. Please log in.");
        } else if (response.status === 404) {
          throw new Error("Function not found.");
        } else {
          throw new Error("Error creating function");
        }
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating function:", error);
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
          throw new Error("You don't have permission to edit. Please log in.");
        } else if (response.status === 404) {
          throw new Error("Function not found.");
        } else {
          throw new Error("Error updating function");
        }
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating function:", error);
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
          throw new Error("You don't have permission to delete. Please log in.");
        } else if (response.status === 404) {
          throw new Error("Function not found.");
        } else {
          throw new Error("Error deleting function");
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting function:", error);
      throw error;
    }
  },

};

export default functionService;