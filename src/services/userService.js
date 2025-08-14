import { ENDPOINTS, HTTP_METHODS,  } from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";
import { mapRoleToId } from "../helpers/roleHelpers";

export const getAllUsers = async () =>
  getHttp(ENDPOINTS.USERS, HTTP_METHODS.GET, getAuthHeaders());

export const createUser = async (userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };
  return getHttp(ENDPOINTS.USERS, HTTP_METHODS.POST, getAuthHeaders(), payload);
};

export const updateUser = async (id, userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };
  return getHttp(
    `${ENDPOINTS.USER_BY_ID}/${id}`,
    HTTP_METHODS.PUT,
    getAuthHeaders(),
    payload
  );
};

export const deleteUser = async (id) => {
  const currentUser = localStorage.getItem("user");
  if (currentUser && JSON.parse(currentUser).id === id) {
    throw new Error("You cannot delete your own account.");
  }
  getHttp(
    `${ENDPOINTS.USER_BY_ID}/${id}`,
    HTTP_METHODS.DELETE,
    getAuthHeaders()
  );
};
