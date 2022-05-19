import React, { useState } from 'react';
import { fetchMovies } from '../../api/fetch';

const SearchMovieForm = ({ searchResults, setSearchResults }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // setIsLoading(true) display spinning gear
        try {
          const data = await fetchMovies(title, year);
          if (data.Response === 'False') throw new Error(`${data.Error}`);
          setSearchResults(data.Search);
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false)
          setTitle('');
          setYear('');
        }
      }}
    >
      <div className="form-floating">
        <input
          required
          className="form-control"
          type="text"
          value={title}
          name="title"
          placeholder="Home Alone"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="title">Title:</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          value={year}
          name="year"
          placeholder="1990"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <label htmlFor="year">Year:</label>
      </div>
      <button type="submit">Search for Movies</button>
    </form>
  );
};

export default SearchMovieForm;
