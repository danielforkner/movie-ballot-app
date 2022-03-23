const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/movie-app');

// USERS
async function createUser({ username, password }) {
  try {
    const result = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [username, password]
    );
    console.log('createUser result:', result);
    return result;
  } catch (error) {}
}

module.exports = {
  client,
  createUser,
};
