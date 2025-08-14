export const INITIAL_MOVIE_FORM = {
  title: "",
  type: "",
  poster: "",
  description: "",
  directorId: "",
};

export const INITIAL_USER_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "User",
};

export const MOVIE_COLUMNS = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "director",
    label: "Director",
    render: (movie) => movie.director?.name || "N/A",
  },
];

export const USER_COLUMNS = [
  {
    key: "name",
    label: "Name",
    render: (user) => `${user.firstName} ${user.lastName}`,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
];
