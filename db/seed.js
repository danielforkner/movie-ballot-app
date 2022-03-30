const { client, getAllUsers, createUser, createPoll } = require('./index');

async function dropTables() {
  try {
    console.log('Dropping tables...');

    await client.query(`
        DROP TABLE IF EXISTS users;
        `);

    await client.query(`
        DROP TABLE IF EXISTS polls;
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
    await client.query(`
    CREATE TABLE polls (
        id SERIAL PRIMARY KEY,
        "dateCreated" DATE NOT NULL,
        options text NOT NULL,
        "authorID" INTEGER
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

    await createUser({
      username: 'affogato',
      password: 'caramel',
    });

    console.log('DONE creating users.');
  } catch (error) {
    throw error;
  }
}

async function createInitialPolls() {
  try {
    console.log('Creating Polls...');
    const [admin] = await getAllUsers();

    const poll = await createPoll({
      date: '2023-03-23',
      options:
        '[option 1: {id: 9784, name: "Friday Night", movies: [{home alone}, {spider man}]}]',
      authorID: admin.id,
    });

    console.log('DONE creating polls.');
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialPolls();
  } catch (error) {
    console.error(error);
  }
}

rebuildDB().then(() => client.end());
