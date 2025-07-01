import { createContext, useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFunctions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await functionService.getAllFunctions();
      setFunctions(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching functions:", err);
    } finally {
      setLoading(false);
    }
  };

  const addFunction = async (movieId, date, time, price) => {
    try {
      setLoading(true);
      setError(null);
      await functionService.createFunction(movieId, date, time, price);
      await fetchFunctions();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editFunction = async (updatedFunction) => {
    try {
      setLoading(true);
      setError(null);
      await functionService.updateFunction(updatedFunction);
      await fetchFunctions();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteFunction = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await functionService.deleteFunction(id);
      await fetchFunctions();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getStats = async () => {
    try {
      return await functionService.getStats();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const getMovies = async () => {
    try {
      return await functionService.getMovies();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  const value = {
    functions,
    loading,
    error,
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
