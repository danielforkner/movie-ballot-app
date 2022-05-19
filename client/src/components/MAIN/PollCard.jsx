import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PollCard = ({ poll, handleDeletePoll }) => {
  return (
    <div style={{ border: '1px solid gray' }}>
      <h4>{poll.name}</h4>
      <p>Date Created: {poll.dateCreated.slice(0, 10)}</p>
      {poll.active ? (
        <Fragment>
          <p>
            {`Public link: `}
            <Link to={`rank/${poll.id}`}>
              {`${window.location.href}/vote/${poll.id}`}
            </Link>
          </p>
        </Fragment>
      ) : (
        <Link to={`${poll.id}`}>
          <button>Manage</button>
        </Link>
      )}
      <button onClick={() => handleDeletePoll(poll.id)}>Delete Poll</button>
    </div>
  );
};

export default PollCard;
