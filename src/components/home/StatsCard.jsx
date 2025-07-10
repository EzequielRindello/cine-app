const StatsCard = ({ icon, title, value }) => (
  <div className="col-md-6 col-lg-3">
    <div className="card text-center h-100 shadow-sm stats-card">
      <div className="card-body">
        <i className={`${icon} fa-3x mb-3`}></i>
        <h5 className="card-title">{title}</h5>
        <h2>{value}</h2>
      </div>
    </div>
  </div>
);

export default StatsCard;
