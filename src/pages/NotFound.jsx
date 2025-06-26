import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page d-flex justify-content-center align-items-center mt-5">
      <div className="text-center">
        <h1>404 - page not found</h1>
        <p>the page you are looking for does not exist</p>
        <Link to="/" className="btn btn-danger">
          go to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
