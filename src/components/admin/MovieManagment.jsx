import { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import * as movieService from "../../services/movieService";
import { INITIAL_MOVIE_FORM } from "../../constants/formData.consts";
import DismissableAlert from "../modals/DismissableAlert";
import CreateEditMovieModal from "../modals/CreateEditMovieModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import LoadingSpinner from "../common/LoadingSpinner";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_MOVIE_FORM);
  const [alert, setAlert] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };

  const loadMovies = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

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

  const resetForm = () => setFormData(INITIAL_MOVIE_FORM);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      ...movie,
      directorId: movie.directorId,
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnHide = () => {
    setShowModal(false);
    setEditingMovie(null);
    resetForm();
  };

  const directorsList = useMemo(() => {
    return movies.map((m) => m.director).filter(Boolean);
  }, [movies]);

  return (
    <>
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
        editingMovie={editingMovie}
        formData={formData}
        directors={directorsList}
        onHide={handleOnHide}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      <DeleteItemModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        item={movieToDelete ? { ...movieToDelete, type: "Movie" } : null}
      />
    </>
  );
};

export default MovieManagement;
