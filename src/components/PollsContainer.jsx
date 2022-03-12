import React from 'react';
import PollCard from './PollCard';

const PollsContainer = ({ setPolls, polls, setCurrentPoll }) => {
  return (
    <div className="pollsContainer">
      <h4>Polls Container</h4>
      {polls.data.map((poll, i) => {
        return (
          <PollCard
            key={i}
            setPolls={setPolls}
            polls={polls}
            poll={poll}
            setCurrentPoll={setCurrentPoll}
          />
        );
      })}
    </div>
  );
};

export default PollsContainer;
