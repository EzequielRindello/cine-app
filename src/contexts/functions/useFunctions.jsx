import { useContext } from "react";
import { FunctionsContext } from "./FunctionsContext";

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error("useFunctions must be used within FunctionsProvider");
  }
  return context;
};
