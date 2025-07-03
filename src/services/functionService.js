import { directors, functions, movies } from "../data/data";

const STORAGE_KEYS = {
  FUNCTIONS: "cinema_functions",
  MOVIES: "cinema_movies",
  DIRECTORS: "cinema_directors",
};

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.FUNCTIONS)) {
    localStorage.setItem(STORAGE_KEYS.FUNCTIONS, JSON.stringify(functions));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MOVIES)) {
    localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DIRECTORS)) {
    localStorage.setItem(STORAGE_KEYS.DIRECTORS, JSON.stringify(directors));
  }
};

const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return [];
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key ${key}:`, error);
  }
};

initializeLocalStorage();

// API Methods
export const functionService = {
  async getStats() {
    await delay(300);
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const directorsData = getFromStorage(STORAGE_KEYS.DIRECTORS);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    const nationalMovies = moviesData.filter((m) => m.type === "national");
    const internationalMovies = moviesData.filter(
      (m) => m.type === "international"
    );

    return {
      totalMovies: moviesData.length,
      nationalMovies: nationalMovies.length,
      internationalMovies: internationalMovies.length,
      totalDirectors: directorsData.length,
      totalFunctions: functionsData.length,
    };
  },

  async getMovies() {
    await delay(400);
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const directorsData = getFromStorage(STORAGE_KEYS.DIRECTORS);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    return moviesData.map((movie) => {
      const director = directorsData.find((d) => d.id === movie.directorId);
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
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const directorsData = getFromStorage(STORAGE_KEYS.DIRECTORS);

    return functionsData.map((func) => {
      const movie = moviesData.find((m) => m.id === func.movieId);
      const director = directorsData.find((d) => d.id === movie?.directorId);

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
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const directorsData = getFromStorage(STORAGE_KEYS.DIRECTORS);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    const movie = moviesData.find((m) => m.id === parseInt(movieId));
    if (!movie) throw new Error("Movie not found");

    const director = directorsData.find((d) => d.id === movie.directorId);
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
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    const movie = moviesData.find((m) => m.id === parseInt(movieId));
    if (!movie) return false;

    const currentFunctions = functionsData.filter(
      (f) => f.movieId === parseInt(movieId)
    );

    if (movie.type === "national") return true;

    return currentFunctions.length < 8;
  },

  canDirectorAddFunction(directorId, date) {
    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    const directorFunctionsOnDate = functionsData.filter((func) => {
      const movie = moviesData.find((m) => m.id === func.movieId);
      return movie && movie.directorId === directorId && func.date === date;
    });

    return directorFunctionsOnDate.length < 10;
  },

  async createFunction(movieId, date, time, price) {
    await delay(400);

    const moviesData = getFromStorage(STORAGE_KEYS.MOVIES);
    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);

    const movie = moviesData.find((m) => m.id === parseInt(movieId));
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
      const directorsData = getFromStorage(STORAGE_KEYS.DIRECTORS);
      const director = directorsData.find((d) => d.id === movie.directorId);
      throw new Error(
        `Director ${director?.name} already has 10 functions scheduled for ${date}`
      );
    }

    const newFunction = {
      id:
        functionsData.length > 0
          ? Math.max(...functionsData.map((f) => f.id)) + 1
          : 1,
      movieId: parseInt(movieId),
      date,
      time,
      price: parseFloat(price),
    };

    const updatedFunctions = [...functionsData, newFunction];
    saveToStorage(STORAGE_KEYS.FUNCTIONS, updatedFunctions);

    return newFunction;
  },

  async updateFunction(updatedFunction) {
    await delay(400);

    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);
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

    saveToStorage(STORAGE_KEYS.FUNCTIONS, functionsData);
    return functionsData[index];
  },

  async deleteFunction(id) {
    await delay(400);

    const functionsData = getFromStorage(STORAGE_KEYS.FUNCTIONS);
    const index = functionsData.findIndex((f) => f.id === id);

    if (index === -1) {
      throw new Error("Function not found");
    }

    const updatedFunctions = functionsData.filter((f) => f.id !== id);
    saveToStorage(STORAGE_KEYS.FUNCTIONS, updatedFunctions);

    return true;
  },

  async resetToDefaults() {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.FUNCTIONS);
    localStorage.removeItem(STORAGE_KEYS.MOVIES);
    localStorage.removeItem(STORAGE_KEYS.DIRECTORS);
    initializeLocalStorage();
    return true;
  },

  exportData() {
    return {
      functions: getFromStorage(STORAGE_KEYS.FUNCTIONS),
      movies: getFromStorage(STORAGE_KEYS.MOVIES),
      directors: getFromStorage(STORAGE_KEYS.DIRECTORS),
    };
  },
};

export default functionService;
