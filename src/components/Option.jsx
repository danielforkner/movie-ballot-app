import React, { useState, useEffect } from "react";
import { fetchMovies } from "../api/fetch";

const Option = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [options, setOptions] = useState([])

  return (
    <div className="optionContainer">
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
            setTitle("");
            setYear("");
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
      <form>
      {options.map((movie, i) => {
          return (
          <div className="option" key={i}>{movie.Title}, ({movie.Year})</div>
          )}, [])}
          </form>
    </div>
  );
};

export default Option;
