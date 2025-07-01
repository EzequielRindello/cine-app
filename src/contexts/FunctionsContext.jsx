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

  const handleAddFunction = (func) => {
    setFunctions((prev) => [...prev, func]);
  };

  const handleDeleteFunction = (id) => {
    setFunctions((prev) => prev.filter((f) => f.id !== id));
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  return (
    <FunctionsContext.Provider
      value={{
        functions,
        fetchFunctions,
        handleAddFunction,
        handleDeleteFunction,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
