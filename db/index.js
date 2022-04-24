const client = require('./client');

const { getUserByUsername } = require('./users');
const {
  createPoll,
  getAllPolls,
  getAllPollsByUserId,
  deletePoll,
} = require('./polls');
const {
  getMoviesByOptionId,
  getMovieIdByTitle,
  createMovie,
} = require('./movies');
const { removeMovieFromOption } = require('./option_movies');
const { createOption, deleteOption } = require('./options');

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM users;`);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  getUserByUsername,
  createUser,
  createPoll,
  deletePoll,
  getAllPolls,
  getAllPollsByUserId,
  createOption,
  deleteOption,
  createMovie,
  getMoviesByOptionId,
  getMovieIdByTitle,
  removeMovieFromOption,
};
