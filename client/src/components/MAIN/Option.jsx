import React, { Fragment, useState } from 'react';
import { addMovieToOption, removeMovieFromOption } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import SearchMovieForm from './SearchMovieForm';

const Option = ({ poll, option }) => {
  const { token, setMyPolls } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleRemoveMovie = async (title) => {
    //
    const response = await removeMovieFromOption(token, title, option.id);
    setMyPolls(response);
  };

  const handleAddMovie = async (title, year) => {
    //
    const response = await addMovieToOption(token, title, year, option.id);
    setMyPolls(response);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <strong className="optionName">{option.name}</strong>
        <div className="list-group">
          {option.movies && option.movies.length > 0
            ? option.movies.map((movie, i) => {
                return (
                  <div
                    key={`poll:${poll.id}option:${option.id}selectedMovie:${i}`}
                    className="list-group-item"
                  >
                    <span
                      onClick={() => handleRemoveMovie(movie.title)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      -
                    </span>{' '}
                    {movie.title}, ({movie.year})
                  </div>
                );
              })
            : 'No Movies Added Yet. Search Below!'}
        </div>
        <button
          onClick={() => setIsSearching(!isSearching)}
          className="btn btn-secondary"
        >
          {isSearching ? 'Close Search' : 'Add Movies'}
        </button>
        {isSearching ? (
          <Fragment>
            <SearchMovieForm
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
            <div className="list-group">
              {searchResults.map((movie, i) => {
                return (
                  <div
                    className="list-group-item"
                    key={`poll:${poll.id}option:${option.id}movieOption:${i}`}
                  >
                    <span
                      onClick={() => handleAddMovie(movie.Title, movie.Year)}
                      className="btn btn-sm btn-success"
                    >
                      +
                    </span>{' '}
                    {movie.Title}, ({movie.Year})
                  </div>
                );
              }, [])}
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default Option;
