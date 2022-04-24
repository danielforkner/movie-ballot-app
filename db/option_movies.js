const client = require('./client');
const { getMovieIdByTitle } = require('./movies');

async function removeMovieFromOption(title, optionId) {
  try {
    const movieID = await getMovieIdByTitle(title);
    if (!movieID) throw error;

    const {
      rows: [movie],
    } = await client.query(
      `
       DELETE
       FROM option_movies
       WHERE option_movies."movieId"=$1 and option_movies."optionId"=$2;
      `,
      [movieID, optionId]
    );

    return movie;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  removeMovieFromOption,
};
