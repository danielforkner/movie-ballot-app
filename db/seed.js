const {
  client,
  getAllUsers,
  createUser,
  createPoll,
  createOption,
  createMovie,
} = require('./index');

async function dropTables() {
  try {
    console.log('Dropping tables...');

    await client.query(`
    DROP TABLE IF EXISTS votes;
    DROP TABLE IF EXISTS poll_options; 
    DROP TABLE IF EXISTS option_movies;
    DROP TABLE IF EXISTS options;   
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS polls;
    DROP TABLE IF EXISTS movies;
        `);
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
        name VARCHAR(255) NOT NULL,
        "authorID" INTEGER,
        deleted BOOLEAN DEFAULT FALSE,
        active BOOLEAN DEFAULT FALSE
        );`);
    await client.query(`
    CREATE TABLE options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
        );`);
    await client.query(`
    CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year VARCHAR(255) NOT NULL
        );`);
    await client.query(`
    CREATE TABLE poll_options (
        id SERIAL PRIMARY KEY,
        "pollId" INTEGER,
        "optionId" INTEGER,
        FOREIGN KEY ("pollId") REFERENCES polls(id),
        FOREIGN KEY ("optionId") REFERENCES options(id)
        );`);
    await client.query(`
    CREATE TABLE option_movies (
        id SERIAL PRIMARY KEY,
        "optionId" INTEGER,
        "movieId" INTEGER,
        FOREIGN KEY ("optionId") REFERENCES options(id),
        FOREIGN KEY ("movieId") REFERENCES movies(id)
        );`);
    await client.query(`
    CREATE TABLE votes (
        id SERIAL PRIMARY KEY,
        "pollId" INTEGER,
        FOREIGN KEY ("pollId") REFERENCES polls(id),
        vote json NOT NULL
        );`);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Creating users...');

    await createUser({
      username: 'dforkner',
      password: 'admin',
    });

    await createUser({
      username: 'affogato',
      password: 'caramel',
    });

    await createUser({
      username: 'daniel',
      password: 'daniel',
    });
  } catch (error) {
    throw error;
  }
}

async function createInitialPolls() {
  try {
    console.log('Creating Polls...');

    await createPoll({
      name: 'Weekend Blast',
      authorID: 3,
    });
  } catch (error) {
    throw error;
  }
}

async function createInitialOptions() {
  try {
    console.log('Creating Options...');
    await createOption({ name: 'Early Movie', poll: 1 });
    await createOption({ name: 'Late Movie', poll: 1 });
    await createOption({ name: 'Saturday Matinee', poll: 1 });
  } catch (error) {
    throw error;
  }
}

async function createInitialMovies() {
  try {
    console.log('Creating Movies...');
    await createMovie('Home Alone', 1990, 1);
    await createMovie('Home Alone 2', 1992, 1);
    await createMovie('Home Alone 3', 1995, 1);
    await createMovie('Spider Man 1', 1997, 2);
    await createMovie('Spider Man 2', 1999, 2);
    await createMovie('Spider Man 3', 2000, 2);
    await createMovie('Mystery Man 1', 2018, 3);
    await createMovie('Mystery Man 2', 2019, 3);
    await createMovie('Mystery Man 3', 2020, 3);
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
    await createInitialOptions();
    await createInitialMovies();
  } catch (error) {
    console.error(error);
  }
}

rebuildDB().then(() => client.end());
