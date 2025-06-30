const HomeHeader = ({ onCallToAction }) => (
  <div className="col-12 text-center mb-4">
    <h1 className="display-3">Welcome back!</h1>
    <p className="fs-6">
      System Statistics ·{" "}
      <strong className="call-to-action-link" onClick={onCallToAction}>
        View movies
      </strong>
    </p>
  </div>
);

export default HomeHeader;
