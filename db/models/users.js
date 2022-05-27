const client = require('../client');
const bcrypt = require('bcrypt');

async function getUser(username, password) {
  try {
    const user = await getUserByUsername(username);
    console.log(`user: ${user}`);
    if (user) {
      const hashed = user.password;
      const match = await bcrypt.compare(password, hashed);
      if (match) {
        const {
          rows: [theUser],
        } = await client.query(
          `
            SELECT *
            FROM users
            WHERE username=$1;
            `,
          [username]
        );
        return theUser;
      } else {
        throw {
          name: 'Invalid Credentials',
          message: 'Invalid Username & Password',
        };
      }
    } else {
      throw {
        name: 'Invalid Credentials',
        message: 'Invalid Username & Password',
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

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
  const hashedPW = await bcrypt.hash(password, 10);
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [username, hashedPW]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUser,
  getUserByUsername,
  getAllUsers,
  createUser,
};
