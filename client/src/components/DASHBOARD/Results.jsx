import React from 'react';

const Results = ({ poll }) => {
  return (
    <>
      {poll.options.map((option, i) => {
        return (
          <div className="card shadow-sm w-100">
            <div className="card-header">
              <h2>{option.name}</h2>
            </div>
            <div className="card-body">
              <p>{`Votes received: ${
                option.voters || 'no one has voted yet'
              }`}</p>
              <p>
                {option.winner
                  ? `Winner: ${option.winner.title}`
                  : 'no winner yet'}
              </p>

              {option.ties ? (
                <>
                  There is a tie between
                  <ul>
                    {option.ties.ties.map((movie) => {
                      return <li>{movie.title}</li>;
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Results;
