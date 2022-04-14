const client = require('./client');

async function getMoviesByOptionId(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT movies.title, movies.year
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
  getMoviesByOptionId,
};
