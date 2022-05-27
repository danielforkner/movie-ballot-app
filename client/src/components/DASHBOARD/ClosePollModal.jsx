import { Modal } from 'react-bootstrap';
import React from 'react';
import { closePoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const ClosePollModal = ({ poll, closingPoll, setClosingPoll }) => {
  const { setMyPolls } = usePolls();
  const { token } = useAuth();

  const handleClosePoll = async () => {
    const updatedPolls = await closePoll(token, poll.id);
    setMyPolls(updatedPolls);
  };

  const handleClose = () => setClosingPoll(false);

  return (
    <Modal show={closingPoll} onHide={handleClose}>
      <header className="modal-header border-bottom-0 text-center">
        <h2 className="fw-bold mb-0">Close Poll</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </header>
      <div className="modal-body d-flex flex-column align-items-center">
        <p className="text-center mb-3">
          Are you sure you want to close the poll? Once closed, no more votes
          will be received and the results will become final and public.
        </p>
        <button
          className="btn btn-lg rounded btn-dark bg-gradient"
          onClick={handleClosePoll}
        >
          Close Poll
        </button>
      </div>
    </Modal>
  );
};

export default ClosePollModal;
