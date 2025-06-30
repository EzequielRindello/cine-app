import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/common/Footer";
import Navigation from "./components/common/Navigation";
import MovieDetails from "./components/movies/MovieDetails";
import Functions from "./pages/Functions";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/functions" element={<Functions />} />

            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
