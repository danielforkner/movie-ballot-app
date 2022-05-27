import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { castVote, fetchPollByLink } from '../../api/fetch';
import Results from '../DASHBOARD/Results';
import VoteLog from '../DASHBOARD/VoteLog';
import { createRankList, swap } from './helpers';
import MovieDetailsModal from './MovieDetailsModal';

const Vote = () => {
  const [showLog, setShowLog] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const { pollLink } = useParams();
  const [currentPoll, setCurrentPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();
  const [rankList, setRankList] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const getPoll = async () => {
    try {
      const [poll] = await fetchPollByLink(pollLink);
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
    if (!currentPoll) return;
    else if (localStorage.getItem(`voted:poll:${currentPoll.id}`)) {
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

  const handleDetails = (movie) => {
    setShowDetails(true);
    setMovieDetails(movie);
  };

  return (
    <Fragment>
      {showLog && (
        <VoteLog
          option={currentOption}
          showLog={showLog}
          setShowLog={setShowLog}
        />
      )}
      {showDetails && (
        <MovieDetailsModal
          movie={movieDetails}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )}
      {closed ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>This Poll Has Closed!</h1>
          <div className="card">
            <div className="card-header">
              <h4>Results</h4>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <Results
                poll={currentPoll}
                setShowLog={setShowLog}
                setCurrentOption={setCurrentOption}
              />
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
                                              className="btn bg-gradient btn-sm btn-warning"
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
                                                className="btn bg-gradient btn-sm btn-warning"
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
                                      [{movie.movie.runtime}]
                                      <button
                                        onClick={() =>
                                          handleDetails(movie.movie)
                                        }
                                        className="btn btn-sm bg-gradient btn-primary"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-info-lg"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"></path>
                                        </svg>
                                      </button>
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
