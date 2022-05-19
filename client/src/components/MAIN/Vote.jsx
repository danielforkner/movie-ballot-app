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
              <div className="album bg-light">
                <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {currentPoll.options.map((option, i) => {
                      return (
                        <div className="col">
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <ul
                                key={`votecard:poll${currentPoll.id}:option${option.id}`}
                                className="list-group"
                              >
                                <h4>{rankList[option.id].name}</h4>
                                {rankList[option.id].movies.map((movie, i) => {
                                  return (
                                    <li
                                      key={`movieRank${i}:option${option.id}`}
                                      className="list-group-item"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() =>
                                          handleRankUp(option.id, movie)
                                        }
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-arrow-up rankUpBtn"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                                        />
                                      </svg>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() =>
                                          handleRankDown(option.id, movie)
                                        }
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-arrow-down rankDwnBtn"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                        />
                                      </svg>
                                      Rank: {movie.rank} {movie.movie.title}, (
                                      {movie.movie.year})
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
