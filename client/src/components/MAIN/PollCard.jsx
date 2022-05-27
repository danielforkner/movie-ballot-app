import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClosePollModal from '../DASHBOARD/ClosePollModal';

const PollCard = ({ poll, handleDeletePoll }) => {
  const [closingPoll, setClosingPoll] = useState(false);

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
                onClick={() => setClosingPoll(true)}
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
      {closingPoll ? (
        <ClosePollModal
          poll={poll}
          closingPoll={closingPoll}
          setClosingPoll={setClosingPoll}
        />
      ) : null}
    </div>
  );
};

export default PollCard;
