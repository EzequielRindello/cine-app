import { ENDPOINTS, LOGIN_ERRORS } from "../constants/cinema.consts";
import { getAuthHeaders, getBasicHeaders } from "../helpers/httpHelpers";

export const login = async (email, password) => {
  const response = await fetch(ENDPOINTS.AUTH_LOGIN, {
    method: "POST",
    headers: getBasicHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error(LOGIN_ERRORS.LOGIN_FAILED);
  return await response.json();
};

export const register = async (data) => {
  const response = await fetch(ENDPOINTS.AUTH_REGISTER, {
    method: "POST",
    headers: getBasicHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(LOGIN_ERRORS.REGISTRATION_FAILED);
  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${ENDPOINTS.AUTH_USER}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
