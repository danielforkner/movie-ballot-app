const client = require('../client');
const axios = require('axios');

// ombdbapi variables
const KEY = process.env.API_KEY;
const BASE_URL = 'https://www.omdbapi.com/?apikey=';

async function createMovie(title, year, imdbID, poster, option) {
  try {
    const response = await axios.get(`${BASE_URL}${KEY}&i=${imdbID}&plot=full`);
    const details = response.data;
    const {
      rows: [movie],
    } = await client.query(
      `
    INSERT INTO movies(title, year, "imdbID", poster, plot, runtime, director, actors)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `,
      [
        title,
        year,
        imdbID,
        poster,
        details.Plot,
        details.Runtime,
        details.Director,
        details.Actors,
      ]
    );

    await client.query(
      `
    INSERT INTO option_movies("optionId", "movieId")
    VALUES ($1, $2)
    RETURNING *;
    `,
      [option, movie.id]
    );

    return movie;
  } catch (error) {
    throw error;
  }
}

async function getMovieIdByTitle(title) {
  try {
    const {
      rows: [data],
    } = await client.query(
      `
    SELECT id
    FROM movies
    WHERE title=$1;
    `,
      [title]
    );
    return data.id;
  } catch (error) {
    throw error;
  }
}

async function getMoviesByOptionId(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT *, option_movies."movieId" as id
    FROM option_movies 
    LEFT JOIN movies on movies.id = option_movies."movieId"
    WHERE option_movies."optionId"=$1
        `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMovie,
  getMoviesByOptionId,
  getMovieIdByTitle,
};
