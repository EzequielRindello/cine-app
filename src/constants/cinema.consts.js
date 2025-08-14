export const MOVIE_ORIGIN = {
  INTERNATIONAL: "international",
  NATIONAL: "national",
};

export const MODAL_MODES = {
  ADD: "add",
  EDIT: "edit",
};

export const ENDPOINTS = {
 MOVIES: "https://localhost:7063/api/Movies",
  DIRECTORS: "https://localhost:7063/api/Directors",
  FUNCTION: "https://localhost:7063/api/Functions",
 
  AUTH_LOGIN: "https://localhost:7063/api/Auth/login",
  AUTH_REGISTER: "https://localhost:7063/api/Auth/register",
  AUTH_USER: "https://localhost:7063/api/Auth/user",
  
  USERS: "https://localhost:7063/api/User",
  USER_BY_ID: "https://localhost:7063/api/User",
  RESERVATIONS: "https://localhost:7063/api/reservation",
  MY_RESERVATIONS: "https://localhost:7063/api/reservation/my-reservations",
};

export const USER_ROLES = {
  SYS_ADMIN: "SysAdmin",
  CINE_ADMIN: "CineAdmin",
  USER: "User",
};

export const FUNTION_ERRORS = {
  FUNCTION_LIMIT:
    "You have reached the maximum number of functions for this movie.",
  DIRECTOR_FUNCTION_LIMIT:
    "The director has reached the maximum number of functions for this date.",
  INTERNATIONAL_MOVIE_LIMIT:
    "This international movie has already reached the limit of 8 functions.",
  MOVIE_LIMIT: "Cannot add more functions for this movie.",
  FUNCTION_NOT_FOUND: "Function not found.",
  FUNTIONS_PERMISSION: "You don't have permission to perform this action.",
  ERROR_FUNCTION: "Error, please contact an administrator.",
  MOVIE_NOT_FOUND: "Movie not found.",
};

export const LOGIN_ERRORS = {
  LOGIN_FAILED: "Login failed. Please check your email and password.",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
};

export const MOVIE_ERRORS = {
  DIRECTORS: "Failed to fetch directors",
  MOVIES: "Failed to fetch movies",
  MOVIE: "Failed to fetch movie",
};