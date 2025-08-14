export const formatFunctionInfo = (func) => {
  const date = new Date(func.date);
  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  const time = func.time.slice(0, 5);

  return `${formattedDate} at ${time} hs - $${func.price}`;
};

export const formatFunctionDateTime = (func) => {
  const date = new Date(func.date);
  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  const time = func.time.slice(0, 5);

  return `${formattedDate} ${time}`;
};

export const formatFunctionForForm = (func) => {
  return {
    date: func.date
      ? new Date(func.date).toISOString().split("T")[0]
      : "",
    time: func.time ? func.time.slice(0, 5) : "",
    price: func.price ?? "",
  };
};
