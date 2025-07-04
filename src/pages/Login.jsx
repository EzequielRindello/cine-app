import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/modals/LoginModal";
import SuccessModal from "../components/modals/SuccessModal";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { token, login, authError } = useAuth();

  const handleCreateAccount = () => {
    setShowModal(true);
  };

  const handleRegister = () => {
    setShowModal(false);
    setSuccessMessage("Account created successfully!");
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please complete all fields");
      return;
    }

    const result = await login(email, password);

    if (result?.success) {
      setSuccessMessage("Logged in successfully!");
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        {token ? (
          <p>You are already logged</p>
        ) : (
          <Card className="login-form p-4 shadow mt-5">
            <h3 className="mb-3 text-center">Enter your credentials</h3>
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {authError && <Alert variant="danger">{authError}</Alert>}

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your passsword"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <p onClick={handleCreateAccount}>Dont have an account?</p>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        )}
      </Container>

      <LoginModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onRegister={handleRegister}
      />

      <SuccessModal
        show={showSuccessModal}
        handleClose={handleSuccessClose}
        message={successMessage}
      />
    </>
  );
};

export default LoginForm;
