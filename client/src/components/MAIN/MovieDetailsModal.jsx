import { Modal } from 'bootstrap';
import React from 'react';

const MovieDetailsModal = ({ movie, showDetails, setShowDetails }) => {
  const handleClose = () => setShowDetails(false);
  return (
    <Modal show={showDetails} onHide={handleClose}>
      <p>{movie.title}</p>
      <p>{movie.runtime}</p>
      <p>
        <img src={movie.poster} alt="movie poster" />
      </p>
      <p>{movie.director}</p>
      <p>{movie.actors}</p>
    </Modal>
  );
};

export default MovieDetailsModal;
