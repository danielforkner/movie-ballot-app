const client = require('../client');
const { mapOptions, today } = require('../utils');

async function createPoll({ name, authorID }) {
  const date = today();
  console.log('Date created: ', date);
  try {
    const {
      rows: [poll],
    } = await client.query(
      `
          INSERT INTO polls("dateCreated", name, "authorID")
          VALUES ($1, $2, $3)
          RETURNING *;`,
      [date, name, authorID]
    );
    return poll;
  } catch (error) {
    throw error;
  }
}

async function getPollById(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID", polls.deleted, polls.active,
        poll_options."optionId",
        options.name as option_name, options.winner, options.ties, options.voters, options.rounds
    FROM POLLS
    LEFT JOIN poll_options ON poll_options."pollId" = polls.id
    LEFT JOIN options on options.id = poll_options."optionId"
    WHERE polls.id=$1
    `,
      [id]
    );

    return mapOptions(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllPolls() {
  try {
    const { rows } = await client.query(`
    SELECT
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID", polls.deleted, polls.active,
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
            *, polls.id as poll_id, polls."dateCreated", polls.name as poll_name, 
            options.name as option_name
        FROM polls
        LEFT JOIN poll_options ON poll_options."pollId" = polls.id
        LEFT JOIN options on options.id = poll_options."optionId"
        WHERE polls."authorID"=$1
        ORDER BY "poll_id" DESC
            `,
      [id]
    );
    const polls = await mapOptions(rows);
    console.log('All mapped polls with options: ', polls);
    return polls;
  } catch (error) {
    throw error;
  }
}

async function deletePoll(pollId) {
  try {
    const {
      rows: [poll],
    } = await client.query(
      `
        UPDATE polls
        SET deleted = true
        WHERE id=$1;
            `,
      [pollId]
    );
    return poll;
  } catch (error) {
    throw error;
  }
}

async function activatePoll(pollId) {
  try {
    const {
      rows: [poll],
    } = await client.query(
      `
        UPDATE polls
        SET active = true
        WHERE id=$1
        RETURNING *;
            `,
      [pollId]
    );
    return poll;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPollById,
  getAllPolls,
  getAllPollsByUserId,
  createPoll,
  deletePoll,
  activatePoll,
};
