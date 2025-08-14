import {
  ENDPOINTS,
  MOVIE_ERRORS,
  HTTP_METHODS,
} from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const getAllDirectors = async () => {
  try {
    return await getHttp(
      ENDPOINTS.DIRECTORS,
      HTTP_METHODS.GET,
      getAuthHeaders()
    );
  } catch {
    throw new Error(MOVIE_ERRORS.DIRECTORS);
  }
};

export const getDirectorById = async (id) =>
  getHttp(`${ENDPOINTS.DIRECTORS}/${id}`, HTTP_METHODS.GET, getAuthHeaders());
