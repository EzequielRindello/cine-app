import {
  ENDPOINTS,
  LOGIN_ERRORS,
  HTTP_METHODS,
} from "../constants/cinema.consts";
import {
  getBasicHeaders,
  getAuthHeaders,
  getHttp,
} from "../helpers/httpHelpers";

export const login = async (email, password) => {
  try {
    return await getHttp(
      ENDPOINTS.AUTH_LOGIN,
      HTTP_METHODS.POST,
      getBasicHeaders(),
      {
        email,
        password,
      }
    );
  } catch {
    throw new Error(LOGIN_ERRORS.LOGIN_FAILED);
  }
};

export const register = async (data) => {
  try {
    return await getHttp(
      ENDPOINTS.AUTH_REGISTER,
      HTTP_METHODS.POST,
      getBasicHeaders(),
      data
    );
  } catch {
    throw new Error(LOGIN_ERRORS.REGISTRATION_FAILED);
  }
};

export const getUserById = async (id) =>
  getHttp(`${ENDPOINTS.AUTH_USER}/${id}`, HTTP_METHODS.GET, getAuthHeaders());
