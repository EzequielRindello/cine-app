import { useRole } from "../../hooks/userRole.js";

const HomeHeader = ({ onCallToAction }) => {
  const { isAdminOrAbove, isUser } = useRole();
  const name = JSON.parse(localStorage.getItem("user"))?.firstName;

  return (
    <div className="col-12 text-center mb-4">
      {name ? (
        <h1 className="display-4">Welcome, {name}!</h1>
      ) : (
        <h1 className="display-4">Welcome to MOVIEapp!</h1>
      )}
      {isAdminOrAbove() && (
        <p className="fs-6">
          System Statistics ·{" "}
          <strong className="call-to-action-link" onClick={onCallToAction}>
            View movies
          </strong>
        </p>
      )}
      {isUser() && (
        <p className="fs-6">
          Discover our films ·{" "}
          <strong className="call-to-action-link" onClick={onCallToAction}>
            View movies
          </strong>
        </p>
      )}
    </div>
  );
};

export default HomeHeader;
