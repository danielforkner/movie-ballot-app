import React, { Fragment, useState } from 'react';
import { fetchMovies } from '../api/fetch';

const SinglePoll = ({ currentPoll }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.id}
      </h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // isSearchingTRUE display spinning gear
          try {
            const data = await fetchMovies(title, year);
            console.log(data);
          } catch (err) {
            console.error(err);
          } finally {
            // isSearchingFALSE
            setTitle('');
            setYear('');
          }
        }}
      >
        <label for="title">Title:</label>
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
        <label for="year">Year:</label>
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
    </Fragment>
  );
};

export default SinglePoll;
