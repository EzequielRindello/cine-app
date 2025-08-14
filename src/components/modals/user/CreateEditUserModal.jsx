import { Modal, Form, Button } from "react-bootstrap";

const CreateEditUserModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onChange,
  editingUser,
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{editingUser ? "Edit User" : "Create User"}</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </Form.Group>
        {!editingUser && (
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={onChange}>
            <option value="User">User</option>
            <option value="CineAdmin">Cinema Admin</option>
            <option value="SysAdmin">System Admin</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {editingUser ? "Update" : "Create"}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default CreateEditUserModal;
