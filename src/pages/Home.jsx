import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import functionService from "../services/functionService.js";
import { useRole } from "../hooks/userRole.js";

import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import HomeHeader from "../components/home/HomeHeader.jsx";
import StatsGrid from "../components/Home/StatsGrid.jsx";
import AdditionalInfo from "../components/Home/AdditionalInfo.jsx";
import ServerError from "../components/common/ServerError.jsx";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdminOrAbove, isUser } = useRole();
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

  const handleCallToAction = () => navigate("/movies");
  const handleCallToActionFunc = () => navigate("/functions");
  const handleLogin = () => navigate("/login");

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <HomeHeader onCallToAction={handleCallToAction} />
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {!loading && isAdminOrAbove() && (
        <>
          <StatsGrid stats={stats} />
          <AdditionalInfo />
        </>
      )}

      {!loading && isUser() && (
        <div className="d-flex flex-column align-items-center mt-3">
          <p>You can browse available movies and reserve tickets.</p>
          <p className="mb-2">
            Note: This app is in early development. Features are limited and
            data may reset at any time.
          </p>
          <p className="mb-3">
            Found a bug or want to give feedback?{" "}
            <a href="mailto:support@cinemaapp.dev">Contact us</a>.
          </p>
          <button
            onClick={handleCallToActionFunc}
            className="btn btn-primary mt-3"
          >
            View Funtions
          </button>
        </div>
      )}

      {!loading && !isAdminOrAbove() && !isUser() && (
        <div className="alert alert-warning">
          <strong>Notice:</strong> Please log in or create an account to use the
          app.{" "}
          <a className="call-to-action-link" onClick={handleLogin}>
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
