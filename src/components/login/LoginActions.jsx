import { Button } from "react-bootstrap";

const LoginActions = ({ handleCreateAccount }) => (
  <>
    <p onClick={handleCreateAccount}>Don't have an account?</p>
    <Button variant="primary" type="submit" className="w-100">
      Login
    </Button>
  </>
);

export default LoginActions;
