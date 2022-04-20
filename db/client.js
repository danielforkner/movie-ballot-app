const { Client } = require('pg');

const DB_NAME = 'movie-app';

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/movie-app`,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
