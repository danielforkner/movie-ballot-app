import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPollById } from '../../api/fetch';
import { createRankList, swap } from './helpers';

const Vote = () => {
  const { pollId } = useParams();
  const [currentPoll, setCurrentPoll] = useState([]);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [rankList, setRankList] = useState(null);

  const getPoll = async () => {
    try {
      const response = await fetchPollById(pollId);
      console.log('get poll response: ', response);
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

  // useEffect that triggers on state change
  // of "hasvoted" that looks for localstorage
  // variable of this poll.

  useEffect(() => {
    if (currentPoll.options && currentPoll.options.length > 0) {
      setRankList(createRankList(currentPoll.options));
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

  return (
    <div>
      {rankList ? (
        <div className="rank-container">
          <h1>{`(render from ranklist) Cast your ranked choice for: ${currentPoll.name}`}</h1>
          <p>{rankList[1].movies[0].title}</p>
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
      ) : (
        <div className="rank-container">
          {currentPoll.options && currentPoll.options.length > 0 && active ? (
            <div>
              <h1>{`(render form current poll)Cast your ranked choice for: ${currentPoll.name}`}</h1>
              {currentPoll.options.map((option, i) => {
                return (
                  <ul
                    key={`votecard:poll${currentPoll.id}:option${option.id}`}
                    className="list-group"
                  >
                    <h4>{option.name}</h4>
                    {option.movies.map((movie, i) => {
                      return (
                        <li
                          key={`movieRank${i}:option${option.id}`}
                          className="list-group-item"
                        >
                          <button
                            onClick={() => console.log(rankList)}
                            className="btn btn-success"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-up-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => console.log(rankList)}
                            className="btn btn-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-down-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          {movie.title}, ({movie.year})
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
              <button>Submit Your Rank Choice!</button>
            </div>
          ) : (
            <h4>This poll is no longer active.</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Vote;
