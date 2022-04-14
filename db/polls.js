const client = require('./client');
const { mapOptions } = require('./utils');

async function getAllPolls() {
  try {
    const { rows } = await client.query(`
    SELECT
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID",
        poll_options."optionId",
        options.name as option_name,
        option_movies."movieId",
        movies.title as movie_title, movies.year as movie_year
    FROM polls
        LEFT JOIN poll_options ON poll_options."pollId" = polls.id
        LEFT JOIN options on options.id = poll_options."optionId"
        LEFT JOIN option_movies on option_movies."optionId" = options.id
        LEFT JOIN movies on movies.id = option_movies."movieId"
        `);
    return mapOptions(rows);
  } catch (error) {
    throw error;
  }
}

// getAllPollsByUser(id) {}

module.exports = {
  getAllPolls,
};
