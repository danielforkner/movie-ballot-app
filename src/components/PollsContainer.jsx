import React from 'react';
import PollCard from './PollCard';

const PollsContainer = (props) => {
  const { setPolls, polls } = props;
  return (
    <div className="pollsContainer">
      <h4>Polls Container</h4>
      {polls.data.map((poll, i) => {
        return (
          <PollCard key={i} setPolls={setPolls} polls={polls} poll={poll} />
        );
      })}
    </div>
  );
};

export default PollsContainer;
