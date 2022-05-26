import React from 'react';
import usePolls from '../hooks/usePolls';
import useAuth from '../hooks/useAuth';
import { fetchCalculateVotes, fetchMyPolls } from '../../api/fetch';

const CurrentPoll = ({ currentPoll, setCurrentPoll }) => {
  const { token } = useAuth();
  const { setMyPolls } = usePolls();

  const refreshVotes = async () => {
    try {
      await fetchCalculateVotes(token, currentPoll.id);
      const polls = await fetchMyPolls(token);
      setMyPolls(polls);
      let [updatedCurrentPoll] = polls.filter(
        (poll) => poll.id === currentPoll.id
      );
      setCurrentPoll(updatedCurrentPoll);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="currentPoll-container">
      {currentPoll ? (
        <div className="d-flex flex-column align-items-start gap-3 mb-3">
          <h1>{currentPoll.name}</h1>
          <h2>{`Date created: ${currentPoll.dateCreated.slice(0, 10)}`}</h2>
          <div className="d-flex justify-content-start gap-3">
            <button
              className="btn bg-gradient btn-primary"
              onClick={refreshVotes}
            >
              Refresh vote count
            </button>
            <button className="btn bg-gradient btn-warning" onClick={() => {}}>
              Close Poll
            </button>
          </div>
          {currentPoll.options.map((option, i) => {
            return (
              <div className="card shadow-sm w-100">
                <div className="card-header">
                  <h2>{option.name}</h2>
                </div>
                <div className="card-body">
                  <p>{`Current vote count: ${
                    option.voters || 'no one has voted yet'
                  }`}</p>
                  <p>
                    {option.winner
                      ? `Current winner: ${option.winner.title}`
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
        </div>
      ) : (
        'Select a poll from the table below'
      )}
    </div>
  );
};

export default CurrentPoll;
