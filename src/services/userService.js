import { ENDPOINTS } from "../data/cinema.consts";

// helpers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const roleMap = {
  User: 1,
  CineAdmin: 2,
  SysAdmin: 3,
};

// User management functions (only SysAdmin can access these endpoints)
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
  const payload = {
    ...userData,
    role: typeof userData.role === "string" ? roleMap[userData.role] : userData.role,
  };
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
  const payload = {
    ...userData,
    role: typeof userData.role === "string" ? roleMap[userData.role] : userData.role,
  };
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