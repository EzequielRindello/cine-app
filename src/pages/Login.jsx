import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Card } from "react-bootstrap";
import { useAuth } from "../contexts/auth";

import LoginFields from "../components/login/LoginFields";
import LoginActions from "../components/login/LoginActions";
import LoginAlerts from "../components/login/LoginAlerts";
import LoginModal from "../components/modals/auth/LoginModal";
import SuccessModal from "../components/modals/SuccessModal";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { token, login, authError, completeLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
    completeLogin();
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
        {token && !showSuccessModal ? (
          <p>You are already logged in</p>
        ) : (
          <Card className="login-form p-4 shadow mt-5">
            <h3 className="mb-3 text-center">Enter your credentials</h3>
            <Form onSubmit={handleSubmit}>
              <LoginAlerts error={error} authError={authError} />
              <LoginFields formData={formData} handleChange={handleChange} />
              <LoginActions handleCreateAccount={handleCreateAccount} />
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
