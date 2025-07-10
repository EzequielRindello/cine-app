import StatsCard from "./StatsCard";

const StatsGrid = ({ stats }) => (
  <div className="row g-4">
    <StatsCard
      icon="fas fa-film"
      title="Total Movies"
      value={stats?.totalMovies || 0}
    />
    <StatsCard
      icon="fas fa-flag"
      title="National Films"
      value={stats?.nationalMovies || 0}
    />
    <StatsCard
      icon="fas fa-globe"
      title="International Films"
      value={stats?.internationalMovies || 0}
    />
    <StatsCard
      icon="fas fa-user-tie"
      title="Total Directors"
      value={stats?.totalDirectors || 0}
    />
  </div>
);

export default StatsGrid;
