import React from 'react';
import { removeMovie } from '../dataHelpers';

const ChosenOptions = ({ chosen, pollID, setPolls, polls, optionIndex }) => {
  return (
    <div className="removeMovieList">
      {chosen.length > 0 ? <span>
        <em>Click to remove</em>
      </span> : null}
      
      {chosen.map((movie, i) => {
        return <p key={i} onClick={() => {
          removeMovie(chosen, movie, polls, pollID, optionIndex, setPolls)
        }}>{movie.Title}</p>;
      })}
    </div>
  );
};

export default ChosenOptions;
