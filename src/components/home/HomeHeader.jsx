const HomeHeader = ({ onCallToAction }) => {
  const name = JSON.parse(localStorage.getItem("user"))?.firstName;

  return (
    <div className="col-12 text-center mb-4">
      {name ? (
        <h1 className="display-4">Welcome back, {name}!</h1>
      ) : (
        <h1 className="display-4">Welcome to MOVIEapp!</h1>
      )}
      <p className="fs-6">
        System Statistics ·{" "}
        <strong className="call-to-action-link" onClick={onCallToAction}>
          View movies
        </strong>
      </p>
    </div>
  );
};

export default HomeHeader;
