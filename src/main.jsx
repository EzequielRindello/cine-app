import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { MoviesProvider } from "./contexts/movies";
import { FunctionsProvider } from "./contexts/functions";
import { AuthProvider } from "./contexts/auth";
import App from "./App.jsx";
import "./styles/custom.css";

createRoot(document.getElementById("root")).render(
  <MoviesProvider>
    <FunctionsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FunctionsProvider>
  </MoviesProvider>
);
