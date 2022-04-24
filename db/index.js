const client = require('./client');

const { getUserByUsername } = require('./users');
const { createPoll, getAllPolls, getAllPollsByUserId } = require('./polls');
const {
  getMoviesByOptionId,
  getMovieIdByTitle,
  createMovie,
} = require('./movies');
const { removeMovieFromOption } = require('./option_movies');

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

async function createOption({ name, poll }) {
  try {
    const {
      rows: [option],
    } = await client.query(
      `
        INSERT INTO options(name)
        VALUES ($1)
        RETURNING *;`,
      [name]
    );

    await client.query(
      `
    INSERT INTO poll_options("pollId", "optionId")
    VALUES ($1, $2);
    `,
      [poll, option.id]
    );
    return option;
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
  getAllPolls,
  getAllPollsByUserId,
  createOption,
  createMovie,
  getMoviesByOptionId,
  getMovieIdByTitle,
  removeMovieFromOption,
};
