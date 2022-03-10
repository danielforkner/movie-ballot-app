import React from 'react';

const PollCard = (props) => {
  const { poll } = props;
  return (
    <div className="pollCard">
      <h4>{poll.name}</h4>
      <p>This is a {poll.pollType} poll</p>
      <button
        onClick={(e) => e.preventDefault() /* this will be a DELETE fetch */}
      >
        REMOVE
      </button>
      {}
    </div>
  );
};

export default PollCard;
