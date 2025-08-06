import { ENDPOINTS } from "../data/cinema.consts";

// helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const login = async (email, password) => {
  const response = await fetch(ENDPOINTS.AUTH_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  return await response.json();
};

export const register = async (data) => {
  const response = await fetch(ENDPOINTS.AUTH_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Registration failed");

  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${ENDPOINTS.AUTH_USER}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user");
  }

  return await response.json();
};

// only SysAdmin can access these endpoints
export const getAllUsers = async () => {
  const response = await fetch(ENDPOINTS.AUTH_USERS, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }

  return await response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(ENDPOINTS.AUTH_USERS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }

  return await response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${ENDPOINTS.AUTH_USERS_BY_ID}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update user");
  }

  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${ENDPOINTS.AUTH_USERS_BY_ID}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete user");
  }

  return await response.json();
};
