import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import functionService from "../services/functionService.js";

import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import HomeHeader from "../components/home/HomeHeader.jsx";
import StatsGrid from "../components/Home/StatsGrid.jsx";
import AdditionalInfo from "../components/Home/AdditionalInfo.jsx";
import ServerError from "../components/common/ServerError.jsx"

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

  const handleCallToAction = () => navigate("/movies");

  if (error) {
    return (
      <ServerError error= {error}/>
    );
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

      {!loading && (
        <>
          <StatsGrid stats={stats} />
          <AdditionalInfo />
        </>
      )}
    </div>
  );
};

export default Home;
