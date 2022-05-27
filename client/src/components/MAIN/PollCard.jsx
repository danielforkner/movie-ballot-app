import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClosePollModal from '../DASHBOARD/ClosePollModal';

const PollCard = ({ poll, handleDeletePoll }) => {
  const [closingPoll, setClosingPoll] = useState(false);

  return (
    <div className="card shadow-sm w-100">
      <div className="card-header">
        <h2>{poll.name}</h2>
      </div>
      <div className="card-body">
        <p>
          <strong>Date Created: </strong>
          {poll.dateCreated.slice(0, 10)}
        </p>
        {poll.active ? (
          <>
            <p>
              <strong>{`Public link: `}</strong>
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
          <>
            {poll.closed ? (
              <p>
                <strong>{`Public link: `}</strong>
                <Link to={`vote/${poll.link}`}>
                  {`${window.location.href}/vote/${poll.link}`}
                </Link>
              </p>
            ) : (
              <Link to={`${poll.link}`}>
                <button className="btn btn-secondary bg-gradient">
                  Manage
                </button>
              </Link>
            )}
          </>
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
