import { ENDPOINTS, MOVIE_ERRORS } from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const getAllDirectors = async () => {
  try {
    return await getHttp(ENDPOINTS.DIRECTORS, "GET", getAuthHeaders());
  } catch {
    throw new Error(MOVIE_ERRORS.DIRECTORS);
  }
};

export const getDirectorById = async (id) =>
  getHttp(`${ENDPOINTS.DIRECTORS}/${id}`, "GET", getAuthHeaders());
