import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api/fetch';

const Option = ({ currentPoll, setCurrentPoll, setPolls, polls }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [options, setOptions] = useState([]);

  const addOption = async (movie, group) => {
    let pollsIndex = polls.data.indexOf(currentPoll);
    // current poll e.g: { id: 1, name: 'Friday Night', pollType: 'single' }
    await setCurrentPoll({
      id: currentPoll.id,
      name: currentPoll.name,
      pollType: currentPoll.pollType,
      groups: {
        group1: [movie],
      },
    });

    await setPolls({
      info: { length: polls.info.length },
      data: [...polls.data.splice(pollsIndex, 1), currentPoll],
    });
    console.log(polls);
    console.log(currentPoll);
  };

  return (
    <div className="optionContainer">
      {/*search for a movie*/}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // isSearchingTRUE display spinning gear
          try {
            const data = await fetchMovies(title, year);
            setOptions(data.Search);
          } catch (err) {
            console.error(err);
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
      <form className="selectOptionForm">
        {options.map((movie, i) => {
          return (
            <div
              className="option"
              key={i}
              onClick={() => {
                addOption(movie, 'test');
              }}
            >
              {movie.Title}, ({movie.Year})
            </div>
          );
        }, [])}
      </form>
    </div>
  );
};

export default Option;
