import { ENDPOINTS } from "../data/cinema.consts";

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
