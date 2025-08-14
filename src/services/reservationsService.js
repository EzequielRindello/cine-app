import { ENDPOINTS } from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const createReservation = async (reservationData) =>
  getHttp(ENDPOINTS.RESERVATIONS, "POST", getAuthHeaders(), reservationData);

export const getMyReservations = async () =>
  getHttp(ENDPOINTS.MY_RESERVATIONS, "GET", getAuthHeaders());

export const updateReservation = async (id, reservationData) =>
  getHttp(
    `${ENDPOINTS.RESERVATIONS}/${id}`,
    "PUT",
    getAuthHeaders(),
    reservationData
  );

export const cancelReservation = async (id) =>
  getHttp(`${ENDPOINTS.RESERVATIONS}/${id}`, "DELETE", getAuthHeaders());
