import { ENDPOINTS } from "../constants/cinema.consts";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const createReservation = async (reservationData) => {
  const response = await fetch(ENDPOINTS.RESERVATIONS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getMyReservations = async () => {
  const response = await fetch(ENDPOINTS.MY_RESERVATIONS, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const updateReservation = async (id, reservationData) => {
  const response = await fetch(`${ENDPOINTS.RESERVATIONS}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const cancelReservation = async (id) => {
  const response = await fetch(`${ENDPOINTS.RESERVATIONS}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
