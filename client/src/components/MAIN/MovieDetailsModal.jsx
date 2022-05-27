import { Modal } from 'react-bootstrap';
import React from 'react';

const MovieDetailsModal = ({ movie, showDetails, setShowDetails }) => {
  const handleClose = () => setShowDetails(false);
  return (
    <Modal show={showDetails} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0">
          {movie.title} ({movie.year})
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </header>
      <div className="d-flex modal-body gap-2 align-items-center">
        <img src={movie.poster} alt="movie poster" />
        <div className="d-flex flex-column justify-content-center">
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Starring:</strong> {movie.actors}
          </p>
          <p>
            <em>Runtime: {movie.runtime}</em>
          </p>
        </div>
      </div>
      <p className="p-3">{movie.plot}</p>
    </Modal>
  );
};

export default MovieDetailsModal;
