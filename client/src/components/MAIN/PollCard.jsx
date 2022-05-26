import React from 'react';
import { Link } from 'react-router-dom';

const PollCard = ({ poll, handleDeletePoll }) => {
  return (
    <div className="card shadow-sm w-100">
      <div className="card-header">
        <h4>{poll.name}</h4>
      </div>
      <div className="card-body">
        <p>Date Created: {poll.dateCreated.slice(0, 10)}</p>
        {poll.active ? (
          <p>
            {`Public link: `}
            <Link to={`vote/${poll.link}`}>
              {`${window.location.href}/vote/${poll.link}`}
            </Link>
          </p>
        ) : (
          <Link to={`${poll.id}`}>
            <button>Manage</button>
          </Link>
        )}
        <button
          className="btn btn-danger bg-gradient"
          onClick={() => handleDeletePoll(poll.id)}
        >
          Delete Poll
        </button>
      </div>
    </div>
  );
};

export default PollCard;
