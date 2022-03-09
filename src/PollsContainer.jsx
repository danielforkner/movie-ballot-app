import React from 'react';

const PollsContainer = (props) => {
  return props.polls.map((poll, i) => {
    return (
      <div className="pollCard" key={i}>
        <h4>{poll.name}</h4>
        <p>This is a {poll.type} poll</p>
      </div>
    );
  });
};

export default PollsContainer;
