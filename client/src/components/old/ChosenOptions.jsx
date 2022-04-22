import React from 'react';
import { removeMovie } from '../dataHelpers';

const ChosenOptions = ({
  pollID,
  setPolls,
  polls,
  currentOption,
  optionIndex,
}) => {
  const chosen = currentOption.movies;
  return (
    <div className="removeMovieList">
      {chosen.length > 0 ? (
        <span>
          <em>Click to remove</em>
        </span>
      ) : null}

      {chosen.map((movie, i) => {
        return (
          <p
            key={i}
            onClick={() => {
              removeMovie(currentOption, movie, polls, pollID, setPolls);
            }}
          >
            {movie.Title}
          </p>
        );
      })}
    </div>
  );
};

export default ChosenOptions;
