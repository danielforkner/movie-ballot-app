import React from 'react';
import usePolls from '../hooks/usePolls';
import useAuth from '../hooks/useAuth';
import { fetchCalculateVotes, fetchMyPolls } from '../../api/fetch';

const CurrentPoll = ({ currentPoll }) => {
  const { token } = useAuth();
  const { myPolls, setMyPolls } = usePolls();

  const handleClick = async () => {
    try {
      const response = await fetchCalculateVotes(token, currentPoll.id);
      console.log(response);
      const polls = await fetchMyPolls(token);
      setMyPolls(polls);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="currentPoll-container">
      {currentPoll.name ? (
        <>
          <button onClick={handleClick}>Refresh vote count</button>
          <h1>{currentPoll.name}</h1>
          <h2>{`Date created: ${currentPoll.dateCreated.slice(0, 10)}`}</h2>
          {currentPoll.options.map((option, i) => {
            return (
              <>
                <h2>{option.name}</h2>
                <p>{`Current vote count: ${
                  option.voters || 'no one has voted yet'
                }`}</p>
                <p>
                  {option.winner
                    ? `Current winner: ${option.winner.title} with a total of ${option.winner.votes} votes after ${option.rounds} rounds.`
                    : 'no winner yet'}
                </p>
              </>
            );
          })}
        </>
      ) : (
        'Select a poll from the table below'
      )}
    </div>
  );
};

export default CurrentPoll;
