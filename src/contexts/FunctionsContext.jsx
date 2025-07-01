import { createContext, useContext, useEffect, useState } from "react";
import { functionService } from "../services/functionService";

const FunctionsContext = createContext();

export const useFunctions = () => useContext(FunctionsContext);

export const FunctionsProvider = ({ children }) => {
  const [functions, setFunctions] = useState([]);

  const fetchFunctions = async () => {
    const data = await functionService.getAllFunctions();
    setFunctions(data);
  };

  const addFunction = async (movieId, date, time, price) => {
    try {
      await functionService.createFunction(movieId, date, time, price);
      await fetchFunctions();
    } catch (error) {
      throw error;
    }
  };

  const editFunction = async (updatedFunction) => {
    try {
      await functionService.updateFunction(updatedFunction);
      await fetchFunctions();
    } catch (error) {
      throw error;
    }
  };

  const deleteFunction = async (id) => {
    try {
      await functionService.deleteFunction(id);
      await fetchFunctions();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  return (
    <FunctionsContext.Provider
      value={{
        functions,
        fetchFunctions,
        addFunction,
        editFunction,
        deleteFunction,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
