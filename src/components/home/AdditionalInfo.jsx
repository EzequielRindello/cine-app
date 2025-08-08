const AdditionalInfo = () => (
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
              <p><strong>System Limits:</strong></p>
              <ul className="list-unstyled">
                <li>• International films: maximum 8 functions</li>
                <li>• National films: unlimited</li>
                <li>• Directors: max. 10 functions per day</li>
                <li>• User: max. 4 reservations per day</li>
              </ul>
            </div>
            <div>
              <p><strong>System Workflow:</strong></p>
              <ul className="list-unstyled">
                <li>• Movies: see all available movies. Add new movies</li>
                <li>• Movie details: see details and create a new functions</li>
                <li>• Functions: search and manage existing functions</li>
                <li>• Users: search and manage existing users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdditionalInfo;
