import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// common components
import Footer from "./components/common/Footer";
import Navigation from "./components/common/Navigation";

// pages 
import Functions from "./pages/Functions";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";

// specific components
import MovieDetails from "./components/movies/MovieDetails";

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
