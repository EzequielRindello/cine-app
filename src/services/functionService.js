import { directors, functions, getStats, movies } from "../data/data";

// simulate a delay for API calls
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

let functionsData = [...functions];

// API Methods
export const functionService = {
  async getStats() {
    await delay(300);
    return getStats();
  },

  async getMovies() {
    await delay(400);
    return movies.map((movie) => {
      const director = directors.find((d) => d.id === movie.directorId);
      const functionsCount = functionsData.filter(
        (f) => f.movieId === movie.id
      ).length;

      return {
        ...movie,
        directorName: director?.name,
        nationality: director?.nationality,
        functionsCount,
      };
    });
  },

  async getAllFunctions() {
    await delay(500);

    return functionsData.map((func) => {
      const movie = movies.find((m) => m.id === func.movieId);
      const director = directors.find((d) => d.id === movie.directorId);

      return {
        ...func,
        movie: {
          ...movie,
          directorName: director?.name,
          nationality: director?.nationality,
        },
      };
    });
  },

  async getMovieFunctions(movieId) {
    await delay(300);
    const movie = movies.find((m) => m.id === parseInt(movieId));
    if (!movie) throw new Error("Movie not found");

    const director = directors.find((d) => d.id === movie.directorId);
    const movieFunctions = functionsData.filter(
      (f) => f.movieId === parseInt(movieId)
    );

    return {
      movie: {
        ...movie,
        directorName: director?.name,
        nationality: director?.nationality,
      },
      functions: movieFunctions,
      canAddMore: this.canAddMoreFunctions(movieId),
    };
  },

  canAddMoreFunctions(movieId) {
    const movie = movies.find((m) => m.id === parseInt(movieId));
    if (!movie) return false;

    const currentFunctions = functionsData.filter(
      (f) => f.movieId === parseInt(movieId)
    );

    if (movie.type === "national") return true;

    return currentFunctions.length < 8;
  },

  canDirectorAddFunction(directorId, date) {
    const directorFunctionsOnDate = functionsData.filter((func) => {
      const movie = movies.find((m) => m.id === func.movieId);
      return movie && movie.directorId === directorId && func.date === date;
    });

    return directorFunctionsOnDate.length < 10;
  },

  async createFunction(movieId, date, time, price) {
    await delay(400);

    const movie = movies.find((m) => m.id === parseInt(movieId));
    if (!movie) throw new Error("Movie not found");

    if (!this.canAddMoreFunctions(movieId)) {
      const limit = movie.type === "international" ? "8 functions" : "no limit";
      throw new Error(
        `This ${
          movie.type === "international" ? "international" : "national"
        } movie ${
          movie.type === "international"
            ? "has already reached the limit of " + limit
            : "should not be throwing this error"
        }`
      );
    }

    if (!this.canDirectorAddFunction(movie.directorId, date)) {
      const director = directors.find((d) => d.id === movie.directorId);
      throw new Error(
        `Director ${director?.name} already has 10 functions scheduled for ${date}`
      );
    }

    const newFunction = {
      id: Math.max(...functionsData.map((f) => f.id)) + 1,
      movieId: parseInt(movieId),
      date,
      time,
      price: parseFloat(price),
    };

    functionsData.push(newFunction);
    return newFunction;
  },

  async updateFunction(updatedFunction) {
    await delay(400);

    const index = functionsData.findIndex((f) => f.id === updatedFunction.id);
    if (index === -1) {
      throw new Error("Function not found");
    }

    functionsData[index] = {
      ...functionsData[index],
      date: updatedFunction.date,
      time: updatedFunction.time,
      price: parseFloat(updatedFunction.price),
    };

    return functionsData[index];
  },

  async deleteFunction(id) {
    await delay(400);

    const index = functionsData.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new Error("Function not found");
    }

    functionsData.splice(index, 1);
    return true;
  },
};

export default functionService;
