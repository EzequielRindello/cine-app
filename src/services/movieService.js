import { ENDPOINTS } from "../data/cinema.consts";

export const getAllDirectors = async () => {
  const response = await fetch(ENDPOINTS.DIRECTORS);
  if (!response.ok) {
    throw new Error("Failed to fetch directors");
  }
  return await response.json();
};

export const getDirectorById = async (id) => {
  const response = await fetch(`${ENDPOINTS.DIRECTORS}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch director");
  }
  return await response.json();
};

export const getAllMovies = async () => {
  const response = await fetch(ENDPOINTS.MOVIES);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return await response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  return await response.json();
};

export const createMovie = async (movieData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(ENDPOINTS.MOVIES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create movie");
  }
  return await response.json();
};

export const updateMovie = async (id, movieData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...movieData, id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update movie");
  }
  return await response.json();
};

export const deleteMovie = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete movie");
  }
};
