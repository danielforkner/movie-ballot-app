import React, { Fragment, useState } from 'react';
import SearchMovieForm from './SearchMovieForm';

const Option = ({ poll, option }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleRemoveMovie = async (title) => {
    //
  };

  const handleAddMovie = async (title, year) => {
    //
  };

  return (
    <div className="optionContainer">
      <strong className="optionName">{option.name}</strong>
      <div className="list-group">
        {option.movies && option.movies.length > 0
          ? option.movies.map((movie, i) => {
              return (
                <div
                  key={`poll:${poll.id}option:${option.id}selectedMovie:${i}`}
                  className="list-group-item"
                >
                  <button
                    onClick={handleRemoveMovie}
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>{' '}
                  {movie.title}, ({movie.year})
                </div>
              );
            })
          : 'No Movies Added Yet. Search Below!'}
      </div>
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
              <button onClick={handleAddMovie} className="btn btn-success">
                +
              </button>{' '}
              {movie.Title}, ({movie.Year})
            </div>
          );
        }, [])}
      </div>
    </div>
  );
};

export default Option;
