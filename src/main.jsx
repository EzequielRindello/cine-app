import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { MoviesProvider } from "./contexts/MoviesContext";
import { FunctionsProvider } from "./contexts/FunctionsContext";
import App from "./App.jsx";
import "./styles/custom.css";

createRoot(document.getElementById("root")).render(
  <MoviesProvider>
    <FunctionsProvider>
      <App />
    </FunctionsProvider>
  </MoviesProvider>
);
