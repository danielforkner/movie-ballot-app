const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/movie_app');

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
    console.log(rows);
    const username = rows[0].username;
    console.log('query:', username);
    return username;
  } catch (error) {
    console.log('CAUGHT ME at line 29 db indx');
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
    console.log('CAUGHT ME at line 46 db indx');
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
