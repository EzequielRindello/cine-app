import { Alert } from "react-bootstrap";

const LoginAlerts = ({ error, authError }) => (
  <>
    {error && <Alert variant="danger">{error}</Alert>}
    {authError && <Alert variant="danger">{authError}</Alert>}
  </>
);

export default LoginAlerts;
