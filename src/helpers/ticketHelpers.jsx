export const renderTicketOptions = (maxAvailable) => {
  return [1, 2, 3, 4].map((num) => (
    <option key={num} value={num} disabled={num > maxAvailable}>
      {num} ticket{num > 1 ? "s" : ""}
    </option>
  ));
};
