import React from 'react';
import PollCard from './PollCard';

const PollsContainer = (props) => {
  const { polls } = props;
  return (
    <div className="pollsContainer">
      <h4>Polls Container</h4>
      {polls.map((poll, i) => {
        return <PollCard key={i} poll={poll} />;
      })}
    </div>
  );
};

export default PollsContainer;
