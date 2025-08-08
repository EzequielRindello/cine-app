import { Modal, Button, Form } from "react-bootstrap";

const CreateEditMovieModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onChange,
  directors,
  editingMovie,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {editingMovie ? "Edit Movie" : "Create New Movie"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
              maxLength={300}
              placeholder="Enter movie title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={onChange}
              required
            >
              <option value="">Select movie type...</option>
              <option value="national">National</option>
              <option value="international">International</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Select
              name="directorId"
              value={formData.directorId}
              onChange={onChange}
              required
            >
              <option value="">Select a director...</option>
              {directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.name} ({director.nationality})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              type="url"
              name="poster"
              value={formData.poster}
              onChange={onChange}
              required
              placeholder="https://example.com/poster.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={onChange}
              required
              maxLength={1000}
              placeholder="Enter movie description"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {editingMovie ? "Update Movie" : "Create Movie"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateEditMovieModal;
