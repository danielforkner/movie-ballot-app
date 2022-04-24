import React from 'react';
import { Link } from 'react-router-dom';

const PollCard = ({ poll, handleDeletePoll }) => {
  return (
    <div style={{ border: '1px solid gray' }}>
      <h4>{poll.name}</h4>
      <p>Date Created: {poll.dateCreated.slice(0, 10)}</p>
      {poll.publicURL ? (
        <p>Public link: {poll.publicURL}</p>
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
