import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/modals/LoginModal";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { login, authError } = useAuth();

  const handleCreateAccount = () => {
    setShowModal(true);
  };

  const handleRegister = (data) => {
    console.log("Account created:", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please compleate all fields");
      return;
    }

    await login(email, password);
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
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
      </Container>

      <LoginModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onRegister={handleRegister}
      />
    </>
  );
};

export default LoginForm;
