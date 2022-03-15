import React from 'react';

const ChosenOptions = ({ chosen, pollID, setPolls, polls, optionIndex }) => {
  return (
    <div className="removeMovieList">
      {chosen.length > 0 ? <span>
        <em>Click to remove</em>
      </span> : null}
      
      {chosen.map((movie, i) => {
        return <p key={i} onClick={() => {
          polls.data[pollID].options[optionIndex].movies = chosen.filter((element) => element.imdbID !== movie.imdbID)
          setPolls({
            info: polls.info,
            data: [
              ...polls.data.map((element) => {
                if (+pollID !== element.index) {
                  return element;
    
                } else return polls.data[pollID]
              })
            ]
          })
        }}>{movie.Title}</p>;
      })}
    </div>
  );
};

export default ChosenOptions;
