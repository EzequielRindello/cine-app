import { createContext, useContext, useState } from "react";
import { functionService } from "../services/functionService";

const FunctionsContext = createContext();

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error("useFunctions must be used inside FunctionsProvider");
  }
  return context;
};

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

  const getMovies = async () => {
    try {
      return await functionService.getMovies();
    } catch (error) {
      console.error("Error getting movies:", error);
      throw error;
    }
  };

  const value = {
    functions,
    fetchFunctions,
    addFunction,
    editFunction,
    deleteFunction,
    getStats,
    getMovies,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
};
