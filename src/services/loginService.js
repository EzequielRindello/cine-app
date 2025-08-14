import { ENDPOINTS, LOGIN_ERRORS } from "../constants/cinema.consts";
import {
  getBasicHeaders,
  getAuthHeaders,
  getHttp,
} from "../helpers/httpHelpers";

export const login = async (email, password) => {
  try {
    return await getHttp(ENDPOINTS.AUTH_LOGIN, "POST", getBasicHeaders(), {
      email,
      password,
    });
  } catch {
    throw new Error(LOGIN_ERRORS.LOGIN_FAILED);
  }
};

export const register = async (data) => {
  try {
    return await getHttp(
      ENDPOINTS.AUTH_REGISTER,
      "POST",
      getBasicHeaders(),
      data
    );
  } catch {
    throw new Error(LOGIN_ERRORS.REGISTRATION_FAILED);
  }
};

export const getUserById = async (id) =>
  getHttp(`${ENDPOINTS.AUTH_USER}/${id}`, "GET", getAuthHeaders());
