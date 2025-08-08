import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import * as movieService from "../../services/movieService";

import DismissableAlert from "../modals/DismissableAlert";
import CreateEditMovieModal from "../modals/CreateEditMovieModal";
import DeleteMovieModal from "../modals/DeleteMovieModal";
import LoadingSpinner from "../common/LoadingSpinner";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    poster: "",
    description: "",
    directorId: "",
  });

  const [alert, setAlert] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    loadMovies();
    loadDirectors();
  }, []);

  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await movieService.getAllMovies();
      setMovies(moviesData);
    } catch (err) {
      showAlert("danger", "Failed to load movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDirectors = async () => {
    try {
      const directorsData = await movieService.getAllDirectors();
      setDirectors(directorsData);
    } catch (err) {
      showAlert("danger", "Failed to load directors");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movieData = {
        ...formData,
        directorId: parseInt(formData.directorId),
      };

      if (editingMovie) {
        await movieService.updateMovie(editingMovie.id, movieData);
        showAlert("success", "Movie updated successfully");
      } else {
        await movieService.createMovie(movieData);
        showAlert("success", "Movie created successfully");
      }

      setShowModal(false);
      setEditingMovie(null);
      resetForm();
      await loadMovies();
    } catch (err) {
      showAlert("danger", err.message || "Error saving movie");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      poster: "",
      description: "",
      directorId: "",
    });
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      type: movie.type,
      poster: movie.poster,
      description: movie.description,
      directorId: movie.directorId.toString(),
    });
    setShowModal(true);
  };

  const confirmDelete = (movie) => {
    setMovieToDelete(movie);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!movieToDelete) return;

    try {
      await movieService.deleteMovie(movieToDelete.id);
      showAlert("success", "Movie deleted successfully");
      await loadMovies();
    } catch (err) {
      showAlert("danger", err.message || "Error deleting movie");
    } finally {
      setShowDeleteModal(false);
      setMovieToDelete(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <DismissableAlert type={alert?.type} message={alert?.message} />

      <div className="d-flex justify-content-between mb-3">
        <h2>Movie Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Movie
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Director</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.type}</td>
                  <td>{movie.director?.name || "N/A"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(movie)}
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

      <CreateEditMovieModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingMovie(null);
          resetForm();
        }}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        directors={directors}
        editingMovie={editingMovie}
      />

      <DeleteMovieModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        movie={movieToDelete}
      />
    </div>
  );
};

export default MovieManagement;
