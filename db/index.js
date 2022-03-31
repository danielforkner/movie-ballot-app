const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/movie-app');

async function getAllUsers() {
  try {
    console.log('trying to get all USers...');
    await client.query(`
    SELECT id, username
    FROM users;`);
    console.log('done');
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT username 
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

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
    console.log('createUser result:', rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createPoll({ date, options, authorID }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO polls("dateCreated", options, "authorID")
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [date, options, authorID]
    );
    console.log('createPoll result:', rows);
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
};
