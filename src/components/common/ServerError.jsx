const ServerError = ({ error }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="alert alert-danger  mt-5" role="alert">
        {error}
      </div>
    </div>
  );
};

export default ServerError;