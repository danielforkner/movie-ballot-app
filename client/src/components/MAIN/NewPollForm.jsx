import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { fetchCreateNewPoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const NewPollForm = ({ isAddingNewPoll, setIsAddingNewPoll }) => {
  const { setMyPolls } = usePolls();
  const { token, user } = useAuth();
  const [pollName, setPollName] = useState('');

  const handleClose = () => setIsAddingNewPoll(false);

  const handleAddNewPoll = async (e) => {
    e.preventDefault();
    const updatedPolls = await fetchCreateNewPoll(token, pollName, user.id);
    setMyPolls(updatedPolls);
    setPollName('');
    handleClose();
  };

  return (
    <Modal show={isAddingNewPoll} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0">Create New Poll</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </header>
      <div className="modal-body">
        <form onSubmit={(e) => handleAddNewPoll(e)}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              name="pollName"
              value={pollName}
              onChange={(e) => setPollName(e.target.value)}
            ></input>
            <label htmlFor="pollName">New Poll Name:</label>
          </div>
          <div className="bg-dark bg-gradient rounded">
            <button
              onClick={(e) => handleAddNewPoll(e)}
              className="w-100 btn btn-lg rounded btn-outline-warning"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewPollForm;
