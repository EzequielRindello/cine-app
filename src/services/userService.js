import { ENDPOINTS } from "../constants/cinema.consts";
import { getAuthHeaders } from "../helpers/httpHelpers";
import { mapRoleToId } from "../helpers/roleHelpers";

// User management functions (only SysAdmin)
export const getAllUsers = async () => {
  const response = await fetch(ENDPOINTS.USERS, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const createUser = async (userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };

  const response = await fetch(ENDPOINTS.USERS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const updateUser = async (id, userData) => {
  const payload = { ...userData, role: mapRoleToId(userData.role) };

  const response = await fetch(`${ENDPOINTS.USER_BY_ID}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${ENDPOINTS.USER_BY_ID}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
