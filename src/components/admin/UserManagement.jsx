import { useState, useEffect, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import * as userService from "../../services/userService";
import { INITIAL_USER_FORM } from "../../constants/formData.consts";
import DismissableAlert from "../modals/DismissableAlert";
import CreateEditUserModal from "../modals/CreateEditUserModal";
import LoadingSpinner from "../common/LoadingSpinner";
import DeleteUserModal from "../modals/DeleteUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_USER_FORM);
  const [alert, setAlert] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      showAlert("danger", "Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const { password, ...updateData } = formData;
        await userService.updateUser(editingUser.id, updateData);
        showAlert("success", "User updated successfully");
      } else {
        await userService.createUser(formData);
        showAlert("success", "User created successfully");
      }

      setShowModal(false);
      setEditingUser(null);
      resetForm();
      await loadUsers();
    } catch (err) {
      showAlert("danger", err.message || "Error saving user");
    }
  };

  const resetForm = () => setFormData(INITIAL_USER_FORM);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      ...user,
      password: "",
    });
    setShowModal(true);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await userService.deleteUser(userToDelete.id);
      showAlert("success", "User deleted");
      await loadUsers();
    } catch (err) {
      showAlert("danger", err.message || "Error deleting user");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnHide = () => {
    setShowModal(false);
    setEditingUser(null);
    resetForm();
  };

  return (
    <>
      <DismissableAlert type={alert?.type} message={alert?.message} />
      <div className="d-flex justify-content-between mb-3">
        <p>Please be aware that some actions are irreversible.</p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create User
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(user)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <CreateEditUserModal
        show={showModal}
        onHide={handleOnHide}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        editingUser={editingUser}
      />
      <DeleteUserModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        user={userToDelete}
      />
    </>
  );
};

export default UserManagement;
