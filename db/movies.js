const client = require('./client');

async function createMovie(title, year, option) {
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
    INSERT INTO movies(title, year)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [title, year]
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
    SELECT movies.title, movies.year, option_movies."movieId" as id
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
