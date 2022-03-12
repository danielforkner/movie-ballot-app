import React from 'react';
import PollCard from './PollCard';
import { fetchMovies } from '../api/fetch';

const PollsContainer = ({ setPolls, polls, setCurrentPoll }) => {
  return (
    <div className="pollsContainer">
      <button
        onClick={async () => {
          const data = await fetchMovies('home', '1990');
          console.log(data);
        }}
      >
        Fetch
      </button>
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
