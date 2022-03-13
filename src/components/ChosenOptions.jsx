import React from 'react';

const ChosenOptions = ({ chosen }) => {
  console.log(chosen);
  return (
    <div className="chosenOptions">
      <span>
        <em>Click to remove</em>
      </span>
      {chosen.map((movie, i) => {
        return <p key={i}>{movie.Title}</p>;
      })}
    </div>
  );
};

export default ChosenOptions;
