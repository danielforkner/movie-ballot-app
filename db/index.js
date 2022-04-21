const client = require('./client');

const { getUserByUsername } = require('./users');
const { createPoll, getAllPolls, getAllPollsByUserId } = require('./polls');
const { getMoviesByOptionId } = require('./movies');

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

async function createMovie({ title, year, option }) {
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
};
