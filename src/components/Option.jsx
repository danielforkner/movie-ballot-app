import React, { useState, Fragment } from 'react';
import { fetchMovies } from '../api/fetch';
import ChosenOptions from './ChosenOptions';

const Option = ({ setPolls, polls, currentPoll, pollID }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Fragment>
      <div className="optionContainer">
        <h4>{currentPoll.options[0].option1.name} (rename)</h4>{' '}
        {/*change bracket 0 to corresponding numOfOptions*/}
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
          <span>
            <em>Click to add</em>
          </span>
          {searchResults.map((movie, i) => {
            return (
              <div
                className="option"
                key={i}
                onClick={() => {
                  currentPoll.options[0].option1.movies.push(movie); // change bracket 0 to the correct corresponding numOfOptions
                  setPolls({
                    info: polls.info,
                    data: [
                      ...polls.data.filter((element) => +pollID !== element.id),
                      currentPoll,
                    ],
                  });
                  console.log('new polls.data', polls.data);
                }}
              >
                {movie.Title}, ({movie.Year})
              </div>
            );
          }, [])}
        </div>
        <ChosenOptions chosen={currentPoll.options[0].option1.movies} />
      </div>
      <button className="generateLinkBtn">
        FINALIZE POLL AND GENERATE LINK
      </button>
    </Fragment>
  );
};

export default Option;
