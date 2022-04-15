import React, { useState, Fragment } from 'react';
import { fetchMovies } from '../api/fetch';
import { addMovie } from '../dataHelpers';
import ChosenOptions from './ChosenOptions';

const Option = ({ currentPoll, setPolls, polls, pollID, optionIndex }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const currentOption = currentPoll.options[optionIndex];

  return (
    <Fragment>
      <div className="optionContainer">
        <h4>{currentOption.name} (rename)</h4>
        <button
          onClick={() => {
            // remove the option
            currentPoll.options = currentPoll.options.filter((element) => {
              return element !== currentOption;
            });
            // set the polls
            setPolls({
              data: [
                ...polls.data.map((element) => {
                  if (+pollID !== element.index) {
                    return element;
                  } else return currentPoll;
                }),
              ],
            });
          }}
        >
          Remove this option
        </button>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // isSearchingTRUE display spinning gear
            try {
              const data = await fetchMovies(title, year);
              console.log(data);
              if (data.Response === 'False') throw new Error(`${data.Error}`);
              setSearchResults(data.Search);
            } catch (error) {
              console.error(error);
            } finally {
              // isSearchingFALSE
              setTitle('');
              setYear('');
            }
          }}
        >
          <label htmlFor="title">Title:</label>
          <input
            required
            type="text"
            value={title}
            name="title"
            placeholder="Home Alone"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            value={year}
            name="year"
            placeholder="1990"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          <button type="submit">Search for Movies</button>
        </form>
        <div className="selectOptionForm">
          {' '}
          {/* RENAME THIS CLASSNAME like selectMovieList vs removeMovieList */}
          {currentOption.movies.length > 0 ? (
            <span>
              <em>Click to add</em>
            </span>
          ) : null}
          {searchResults.map((movie, i) => {
            return (
              <div
                className="option"
                key={i}
                onClick={() => {
                  addMovie(currentOption, movie, polls, pollID, setPolls);
                }}
              >
                {movie.Title}, ({movie.Year})
              </div>
            );
          }, [])}
        </div>
        <ChosenOptions
          currentOption={currentOption}
          optionIndex={optionIndex}
          polls={polls}
          setPolls={setPolls}
          pollID={pollID}
        />
      </div>
    </Fragment>
  );
};

export default Option;
