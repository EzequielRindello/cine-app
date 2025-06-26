// data.js - mock data

// available directors
export const directors = [
  { id: 1, name: "Christopher Nolan", nationality: "British" },
  { id: 2, name: "Quentin Tarantino", nationality: "American" },
  { id: 3, name: "Martin Scorsese", nationality: "American" },
  { id: 4, name: "Denis Villeneuve", nationality: "Canadian" },
  { id: 5, name: "Guillermo del Toro", nationality: "Mexican" },
  { id: 6, name: "Pedro Almodóvar", nationality: "Spanish" },
  { id: 7, name: "Alejandro González Iñárritu", nationality: "Mexican" },
  { id: 8, name: "Luis Puenzo", nationality: "Argentinian" },
  { id: 9, name: "Juan José Campanella", nationality: "Argentinian" },
  { id: 10, name: "Pablo Trapero", nationality: "Argentinian" },
  { id: 11, name: "Luisa Bemberg", nationality: "Argentinian" },
  { id: 12, name: "Lisandro Alonso", nationality: "Argentinian" },
];

// available movies
export const movies = [
  {
    id: 1,
    title: "Inception",
    directorId: 1,
    director: "Christopher Nolan",
    type: "international",
    poster:
      "https://http2.mlstatic.com/D_NQ_NP_2X_860530-MLA81194764967_122024-F.webp",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 2,
    title: "Pulp Fiction",
    directorId: 2,
    director: "Quentin Tarantino",
    type: "international",
    poster: "https://m.media-amazon.com/images/I/718LfFW+tIL._AC_SL1280_.jpg",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
  },
  {
    id: 3,
    title: "The Departed",
    directorId: 3,
    director: "Martin Scorsese",
    type: "international",
    poster:
      "https://www.originalfilmart.com/cdn/shop/products/departed_2006_original_film_art_921946c9-5eaa-43a5-9425-2e13cb2de4ac_5000x.jpg?v=1679940744g",
    description:
      "An undercover cop and a police informant play a deadly game of cat and mouse.",
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    directorId: 4,
    director: "Denis Villeneuve",
    type: "international",
    poster:
      "https://postercity.com.ar/wp-content/uploads/2017/10/blade-runner-2049-poster-main-scaled-scaled.jpg",
    description:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
  },
  {
    id: 5,
    title: "El Secreto de Sus Ojos",
    directorId: 9,
    director: "Juan José Campanella",
    type: "national",
    poster:
      "https://haddockfilms.com/wp-content/uploads/2019/04/El-secreto-poster.jpg",
    description:
      "A retired legal counselor writes a novel hoping to find closure for one of his past unresolved homicide cases.",
  },
  {
    id: 6,
    title: "La Historia Oficial",
    directorId: 8,
    director: "Luis Puenzo",
    type: "national",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWI5NDBlYzUtYzE4ZS00MmI2LTgzOGEtNTVjNzZlMDZmMDcyXkEyXkFqcGc@._V1_.jpg",
    description:
      "During the final months of Argentinian military dictatorship, a high school teacher sets out to find out who the mother of her adopted daughter is.",
  },
  {
    id: 7,
    title: "Carancho",
    directorId: 10,
    director: "Pablo Trapero",
    type: "national",
    poster:
      "https://es.web.img2.acsta.net/r_1920_1080/medias/nmedia/18/78/18/74/19632325.jpg",
    description:
      "A ambulance-chasing lawyer gets romantically involved with an ambulance paramedic and becomes entangled in a web of corruption.",
  },
  {
    id: 8,
    title: "Relatos Salvajes",
    directorId: 12,
    director: "Damián Szifron",
    type: "national",
    poster:
      "https://contarte.com.ar/wp-content/uploads/2024/08/Relatos.webp",
    description:
      "Six short stories that explore the extremities of human behavior involving people in distress.",
  },
];

// functions
export const functions = [
  // functions for Inception
  {
    id: 1,
    movieId: 1,
    date: "2025-06-26",
    time: "14:00",
    price: 2500,
  },
  {
    id: 2,
    movieId: 1,
    date: "2025-06-26",
    time: "17:30",
    price: 3000,
  },
  {
    id: 3,
    movieId: 1,
    date: "2025-06-26",
    time: "21:00",
    price: 3500,
  },
  {
    id: 4,
    movieId: 1,
    date: "2025-06-27",
    time: "15:00",
    price: 2500,
  },
  {
    id: 5,
    movieId: 1,
    date: "2025-06-27",
    time: "19:00",
    price: 3200,
  },

  // functions for El Secreto de Sus Ojos
  {
    id: 6,
    movieId: 5,
    date: "2025-06-26",
    time: "16:00",
    price: 2200,
  },
  {
    id: 7,
    movieId: 5,
    date: "2025-06-26",
    time: "19:30",
    price: 2800,
  },
  {
    id: 8,
    movieId: 5,
    date: "2025-06-27",
    time: "14:30",
    price: 2200,
  },
  {
    id: 9,
    movieId: 5,
    date: "2025-06-27",
    time: "18:00",
    price: 2800,
  },
  {
    id: 10,
    movieId: 5,
    date: "2025-06-27",
    time: "21:30",
    price: 3000,
  },

  // functions for Pulp Fiction
  {
    id: 11,
    movieId: 2,
    date: "2025-06-26",
    time: "20:00",
    price: 3200,
  },
  {
    id: 12,
    movieId: 2,
    date: "2025-06-27",
    time: "22:00",
    price: 3500,
  },

  // functions for La Historia Oficial
  {
    id: 13,
    movieId: 6,
    date: "2025-06-26",
    time: "15:30",
    price: 2000,
  },
  {
    id: 14,
    movieId: 6,
    date: "2025-06-27",
    time: "17:00",
    price: 2200,
  },

  // functions for Relatos Salvajes
  {
    id: 15,
    movieId: 8,
    date: "2025-06-26",
    time: "18:30",
    price: 2800,
  },
  {
    id: 16,
    movieId: 8,
    date: "2025-06-26",
    time: "21:45",
    price: 3200,
  },
  {
    id: 17,
    movieId: 8,
    date: "2025-06-27",
    time: "16:30",
    price: 2600,
  },
];

// helper function to get stats for the home page
export const getStats = () => {
  const nationalMovies = movies.filter((m) => m.type === "national");
  const internationalMovies = movies.filter((m) => m.type === "international");

  return {
    totalMovies: movies.length,
    nationalMovies: nationalMovies.length,
    internationalMovies: internationalMovies.length,
    totalDirectors: directors.length,
    totalFunctions: functions.length,
  };
};
