import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { castVote, fetchPollById } from '../../api/fetch';
import { createRankList, swap } from './helpers';

const Vote = () => {
  const { pollId } = useParams();
  const [currentPoll, setCurrentPoll] = useState([]);
  const [voted, setVoted] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [rankList, setRankList] = useState(null);

  const getPoll = async () => {
    try {
      const response = await fetchPollById(pollId);
      setCurrentPoll(response[0]);
      setActive(response[0].active);
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
    if (localStorage.getItem(`voted:poll:${pollId}`)) {
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
      const response = await castVote(rankList, pollId);
      localStorage.setItem(`voted:poll:${pollId}`, true);
      setVoted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
              <button className="btn btn-success" onClick={handleSubmitRank}>
                Finalize and submit your ranked choice.
              </button>
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
                                  {i === 0 ? null : (
                                    <button
                                      className="btn btn-sm btn-warning"
                                      onClick={() =>
                                        handleRankUp(option.id, movie)
                                      }
                                    >
                                      <i className="down arrow"></i>
                                    </button>
                                  )}
                                  {i === len - 1 ? null : (
                                    <button
                                      className="btn btn-sm btn-warning"
                                      onClick={() =>
                                        handleRankUp(option.id, movie)
                                      }
                                    >
                                      <i className="up arrow"></i>
                                    </button>
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
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Vote;
