import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { castVote, fetchPollByLink } from '../../api/fetch';
import Results from '../DASHBOARD/Results';
import { createRankList, swap } from './helpers';

const Vote = () => {
  const { pollLink } = useParams();
  const [currentPoll, setCurrentPoll] = useState([]);
  const [voted, setVoted] = useState(false);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();
  const [rankList, setRankList] = useState(null);

  const getPoll = async () => {
    try {
      const [poll] = await fetchPollByLink(pollLink);
      console.log('poll: ', poll);
      setCurrentPoll(poll);
      if (poll.closed) setClosed(true);
    } catch (error) {
      if (error.name === 'NoPageExists') {
        console.error(error.message);
        navigate('/', { replace: true });
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    getPoll();
  }, []);

  useEffect(() => {
    if (localStorage.getItem(`voted:poll:${currentPoll.id}`)) {
      setVoted(true);
    } else if (currentPoll.options && currentPoll.options.length > 0) {
      const newRankList = createRankList(currentPoll.options);
      setRankList(newRankList);
    } else {
      return;
    }
  }, [currentPoll]);

  const handleRankUp = (optionId, movie) => {
    const newList = {};
    for (const key in rankList) {
      newList[key] = rankList[key];
    }
    let movies = newList[optionId].movies;
    let idx = movies.indexOf(movie);
    if (idx > 0) {
      swap(movies, idx, idx - 1);
      newList[optionId].movies = movies;
      setRankList(newList);
    } else {
      return;
    }
  };

  const handleRankDown = (optionId, movie) => {
    const newList = {};
    for (const key in rankList) {
      newList[key] = rankList[key];
    }
    let movies = newList[optionId].movies;
    let idx = movies.indexOf(movie);
    if (idx < movies.length - 1) {
      swap(movies, idx, idx + 1);
      newList[optionId].movies = movies;
      setRankList(newList);
    } else {
      return;
    }
  };

  const handleSubmitRank = async () => {
    try {
      await castVote(rankList, currentPoll.id);
      localStorage.setItem(`voted:poll:${currentPoll.id}`, true);
      setVoted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      {closed ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>This Poll Has Closed!</h1>
          <div className="card">
            <div className="card-header">
              <h4>Results</h4>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <Results poll={currentPoll} />
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          {voted ? (
            <div className="d-flex justify-content-center align-items-center">
              <h1>Thanks for your vote!</h1>
            </div>
          ) : (
            <Fragment>
              {rankList ? (
                <div className="rank-container d-flex flex-column align-items-center">
                  <h1>{`Cast your ranked choice for: ${currentPoll.name}`}</h1>

                  <div className="album p-5 w-100">
                    <div className="d-flex flex-wrap justify-content-center gap-4">
                      {currentPoll.options.map((option, i) => {
                        return (
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <ul
                                key={`votecard:poll${currentPoll.id}:option${option.id}`}
                                className="list-group"
                              >
                                <h4>{rankList[option.id].name}</h4>
                                {rankList[option.id].movies.map((movie, i) => {
                                  let len = rankList[option.id].movies.length;
                                  return (
                                    <li
                                      key={`movieRank${i}:option${option.id}`}
                                      className="list-group-item d-flex gap-2 align-items-center"
                                    >
                                      {i === 0 ? (
                                        <button
                                          className="btn btn-sm btn-warning"
                                          onClick={() =>
                                            handleRankDown(option.id, movie)
                                          }
                                        >
                                          <i className="down arrow"></i>
                                        </button>
                                      ) : (
                                        <>
                                          {i === len - 1 ? (
                                            <button
                                              className="btn btn-sm btn-warning"
                                              onClick={() =>
                                                handleRankUp(option.id, movie)
                                              }
                                            >
                                              <i className="up arrow"></i>
                                            </button>
                                          ) : (
                                            <>
                                              {' '}
                                              <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() =>
                                                  handleRankUp(option.id, movie)
                                                }
                                              >
                                                <i className="up arrow"></i>
                                              </button>{' '}
                                              <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() =>
                                                  handleRankDown(
                                                    option.id,
                                                    movie
                                                  )
                                                }
                                              >
                                                <i className="down arrow"></i>
                                              </button>
                                            </>
                                          )}
                                        </>
                                      )}
                                      <span style={{ fontWeight: '900' }}>
                                        Rank: {movie.rank}
                                      </span>{' '}
                                      {movie.movie.title}, ({movie.movie.year})
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={handleSubmitRank}
                  >
                    Finalize and submit your ranked choice.
                  </button>
                </div>
              ) : null}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Vote;
