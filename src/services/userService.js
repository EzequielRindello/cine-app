import { ENDPOINTS } from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";
import { mapRoleToId } from "../helpers/roleHelpers";

export const getAllUsers = async () =>
  getHttp(ENDPOINTS.USERS, "GET", getAuthHeaders());

export const createUser = async (userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };
  return getHttp(ENDPOINTS.USERS, "POST", getAuthHeaders(), payload);
};

export const updateUser = async (id, userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };
  return getHttp(
    `${ENDPOINTS.USER_BY_ID}/${id}`,
    "PUT",
    getAuthHeaders(),
    payload
  );
};

export const deleteUser = async (id) =>
  getHttp(`${ENDPOINTS.USER_BY_ID}/${id}`, "DELETE", getAuthHeaders());
