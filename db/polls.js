const client = require('./client');
const { mapOptions } = require('./utils');
const { today } = require('./utils');

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

async function getAllPolls() {
  try {
    const { rows } = await client.query(`
    SELECT
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID",
        poll_options."optionId",
        options.name as option_name
    FROM polls
        LEFT JOIN poll_options ON poll_options."pollId" = polls.id
        LEFT JOIN options on options.id = poll_options."optionId"
        `);
    //return rows;
    return mapOptions(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllPollsByUserId(id) {
  try {
    const { rows } = await client.query(
      `
        SELECT
            polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID",
            poll_options."optionId",
            options.name as option_name
        FROM polls
            LEFT JOIN poll_options ON poll_options."pollId" = polls.id
            LEFT JOIN options on options.id = poll_options."optionId"
        WHERE polls."authorID"=$1
            `,
      [id]
    );
    return mapOptions(rows);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllPolls,
  getAllPollsByUserId,
  createPoll,
};