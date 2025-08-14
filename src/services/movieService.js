import {
  ENDPOINTS,
  MOVIE_ERRORS,
  HTTP_METHODS,
} from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const getAllMovies = async () => {
  try {
    return await getHttp(ENDPOINTS.MOVIES, HTTP_METHODS.GET, getAuthHeaders());
  } catch {
    throw new Error(MOVIE_ERRORS.MOVIES);
  }
};

export const getMovieById = async (id) => {
  try {
    return await getHttp(
      `${ENDPOINTS.MOVIES}/${id}`,
      HTTP_METHODS.GET,
      getAuthHeaders()
    );
  } catch {
    throw new Error(MOVIE_ERRORS.MOVIE);
  }
};

export const createMovie = async (movieData) =>
  getHttp(ENDPOINTS.MOVIES, HTTP_METHODS.POST, getAuthHeaders(), movieData);

export const updateMovie = async (id, movieData) =>
  getHttp(`${ENDPOINTS.MOVIES}/${id}`, HTTP_METHODS.PUT, getAuthHeaders(), {
    ...movieData,
    id,
  });

export const deleteMovie = async (id) =>
  getHttp(`${ENDPOINTS.MOVIES}/${id}`, HTTP_METHODS.DELETE, getAuthHeaders());
