export const canModifyReservation = (reservation) => {
  if (!reservation?.movieFunction?.date) return false;

  const functionDateTime = new Date(reservation.movieFunction.date);
  const now = new Date();
  const oneHourBefore = new Date(functionDateTime.getTime() - 60 * 60 * 1000);

  return now < oneHourBefore;
};
