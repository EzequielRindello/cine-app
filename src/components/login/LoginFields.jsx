import { Form } from "react-bootstrap";

const LoginFields = ({ formData, handleChange }) => (
  <>
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
        placeholder="Your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </Form.Group>
  </>
);

export default LoginFields;
