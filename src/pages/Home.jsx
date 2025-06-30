import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import functionService from "../services/functionService.js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await functionService.getStats();
        setStats(data);
      } catch (err) {
        setError("Error while loading stats. Please try again later.");
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-3">Welcome back!</h1>
          <p className="fs-6">
            System Statistics ·{" "}
            <strong
              style={{
                cursor: "pointer",
                textDecoration: "none",
                fontStyle: "italic",
              }}
              onClick={() => navigate("/movies")}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              View movies
            </strong>
          </p>
        </div>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {!loading && (
        <>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100 shadow-sm stats-card">
                <div className="card-body">
                  <i className="fas fa-film fa-3x mb-3"></i>
                  <h5 className="card-title">Total Movies</h5>
                  <h2>{stats?.totalMovies || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100 shadow-sm stats-card">
                <div className="card-body">
                  <i className="fas fa-flag fa-3x mb-3"></i>
                  <h5 className="card-title">National Films</h5>
                  <h2>{stats?.nationalMovies || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100 shadow-sm stats-card">
                <div className="card-body">
                  <i className="fas fa-globe fa-3x mb-3"></i>
                  <h5 className="card-title">International Films</h5>
                  <h2>{stats?.internationalMovies || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card text-center h-100 shadow-sm stats-card">
                <div className="card-body">
                  <i className="fas fa-user-tie fa-3x mb-3"></i>
                  <h5 className="card-title">Total Directors</h5>
                  <h2>{stats?.totalDirectors || 0}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div className="card additional-info-card">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    Additional information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div>
                      <p>
                        <strong>System Limits:</strong>
                      </p>
                      <ul className="list-unstyled">
                        <li>• International films: maximum 8 functions</li>
                        <li>• National films: unlimited</li>
                        <li>• Directors: max. 10 functions per day</li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        <strong>System Workflow:</strong>
                      </p>
                      <ul className="list-unstyled">
                        <li>• Movies: see all available movies</li>
                        <li>
                          • Movies details: see details for a specific movie and
                          create a new function
                        </li>
                        <li>
                          • Functions: search and manage existing functions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
