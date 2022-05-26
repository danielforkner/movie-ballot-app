import React from 'react';
import { Link } from 'react-router-dom';
import { closePoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const PollCard = ({ poll, handleDeletePoll }) => {
  const { setMyPolls } = usePolls();
  const { token } = useAuth();
  const handleClosePoll = async () => {
    const updatedPolls = await closePoll(token, poll.id);
    setMyPolls(updatedPolls);
  };
  return (
    <div className="card shadow-sm w-100">
      <div className="card-header">
        <h4>{poll.name}</h4>
      </div>
      <div className="card-body">
        <p>Date Created: {poll.dateCreated.slice(0, 10)}</p>
        {poll.active ? (
          <>
            <p>
              {`Public link: `}
              <Link to={`vote/${poll.link}`}>
                {`${window.location.href}/vote/${poll.link}`}
              </Link>
            </p>
            <div className="d-flex justify-content-start gap-3">
              <button
                className="btn btn-danger bg-gradient"
                onClick={() => handleDeletePoll(poll.id)}
              >
                Delete Poll
              </button>
              <button
                className="btn btn-warning bg-gradient"
                onClick={handleClosePoll}
              >
                Close Poll
              </button>
            </div>
          </>
        ) : (
          <Link to={`${poll.link}`}>
            <button>Manage</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PollCard;
