import React from 'react';

const ChosenOptions = ({ chosen }) => {
  console.log(chosen);
  return (
    <div>
      {chosen.map((movie, i) => {
        return <span key={i}>{movie.Title}</span>;
      })}
    </div>
  );
};

export default ChosenOptions;
