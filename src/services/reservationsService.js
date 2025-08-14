import { ENDPOINTS, HTTP_METHODS } from "../constants/cinema.consts";
import { getAuthHeaders, getHttp } from "../helpers/httpHelpers";

export const createReservation = async (reservationData) =>
  getHttp(
    ENDPOINTS.RESERVATIONS,
    HTTP_METHODS.POST,
    getAuthHeaders(),
    reservationData
  );

export const getMyReservations = async () =>
  getHttp(ENDPOINTS.MY_RESERVATIONS, HTTP_METHODS.GET, getAuthHeaders());

export const updateReservation = async (id, reservationData) =>
  getHttp(
    `${ENDPOINTS.RESERVATIONS}/${id}`,
    HTTP_METHODS.PUT,
    getAuthHeaders(),
    reservationData
  );

export const cancelReservation = async (id) =>
  getHttp(
    `${ENDPOINTS.RESERVATIONS}/${id}`,
    HTTP_METHODS.DELETE,
    getAuthHeaders()
  );
