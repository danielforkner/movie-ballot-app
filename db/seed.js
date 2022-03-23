const { client, createUser } = require('./index');

async function dropTables() {
  try {
    console.log('Dropping tables...');

    await client.query(`
        DROP TABLE IF EXISTS users;
        `);

    console.log('DONE dropping tables.');
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building tables...');
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );`);
    console.log('DONE building tables.');
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Creating users...');

    const admin = await createUser({
      username: 'dforkner',
      password: 'admin',
    });
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

rebuildDB().then(() => client.end());
