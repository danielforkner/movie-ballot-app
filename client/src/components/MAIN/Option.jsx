import React, { useState } from 'react';
import { fetchMovies } from '../../api/fetch';

const Option = ({ option }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="optionContainer">
      {option.name}
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
      <div className="selectOptionForm">Hi</div>
      {searchResults.map((movie, i) => {
        return (
          <div className="option" key={i}>
            {movie.Title}, ({movie.Year})
          </div>
        );
      }, [])}
    </div>
  );
};

export default Option;
