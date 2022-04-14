const client = require('./client');
const { today } = require('./utils');
const { getAllPolls } = require('./polls');
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

async function getUserByUsername(usr) {
  try {
    const { rows } = await client.query(
      `
      SELECT username 
      FROM users
      WHERE username=$1;
    `,
      [usr]
    );

    if (rows.length < 1) {
      return;
    }
    const username = rows[0].username; // how can you deconstruct this on line 18?
    return username;
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

async function createPoll({ name, authorID }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO polls("dateCreated", name, "authorID")
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [today(), name, authorID]
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
  createOption,
  createMovie,
  getMoviesByOptionId,
};
