import { useState } from "react";
import { FunctionsContext } from "./FunctionsContext";
import { functionService } from "../../services/functionService";

export const FunctionsProvider = ({ children }) => {
  const [functions, setFunctions] = useState([]);

  const fetchFunctions = async () => {
    try {
      const data = await functionService.getAllFunctions();
      setFunctions(data);
    } catch (err) {
      console.error("Error fetching functions:", err);
    }
  };

  const getMovieFunctions = async (movieId) => {
    try {
      return await functionService.getMovieFunctions(movieId);
    } catch (error) {
      console.error("Error getting movie functions:", error);
      throw error;
    }
  };

  const addFunction = async (movieId, date, time, price) => {
    try {
      await functionService.createFunction(movieId, date, time, price);
      await fetchFunctions();
    } catch (error) {
      console.error("Error adding function:", error);
      throw error;
    }
  };

  const editFunction = async (updatedFunction) => {
    try {
      await functionService.updateFunction(updatedFunction);
      await fetchFunctions();
    } catch (error) {
      console.error("Error editing function:", error);
      throw error;
    }
  };

  const deleteFunction = async (id) => {
    try {
      await functionService.deleteFunction(id);
      await fetchFunctions();
    } catch (error) {
      console.error("Error deleting function:", error);
      throw error;
    }
  };

  const getStats = async () => {
    try {
      return await functionService.getStats();
    } catch (error) {
      console.error("Error getting stats:", error);
      throw error;
    }
  };

  return (
    <FunctionsContext.Provider
      value={{
        functions,
        fetchFunctions,
        addFunction,
        editFunction,
        deleteFunction,
        getStats,
        getMovieFunctions,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
