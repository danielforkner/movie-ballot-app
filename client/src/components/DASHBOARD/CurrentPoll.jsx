import React from 'react';

const CurrentPoll = ({ currentPoll }) => {
  return (
    <div id="currentPoll-container">
      {currentPoll.name ? (
        <>
          <button>Refresh vote count</button>
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
                    ? `Current winner: ${option.winner} with a total of ${currentPoll.winner.votes} votes`
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
