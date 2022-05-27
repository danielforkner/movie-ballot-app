const client = require('../client');
const { mapOptions, today } = require('../utils');
const bcrypt = require('bcrypt');

async function createPoll({ name, authorID }) {
  const link = await (await bcrypt.hash(Date.now().toString(), 4)).slice(0, 12);
  const date = today();
  try {
    const {
      rows: [poll],
    } = await client.query(
      `
          INSERT INTO polls("dateCreated", name, "authorID", link)
          VALUES ($1, $2, $3, $4)
          RETURNING *;`,
      [date, name, authorID, link]
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
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID", polls.deleted, polls.active, polls.closed, polls.link,
        poll_options."optionId", polls.link,
        options.name as option_name, options.winner, options.ties, options.voters, options.rounds, options.log
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

async function getPollByLink(link) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID", polls.deleted, polls.active, polls.closed, polls.link,
        poll_options."optionId",
        options.name as option_name, options.winner, options.ties, options.voters, options.rounds, options.log
    FROM POLLS
    LEFT JOIN poll_options ON poll_options."pollId" = polls.id
    LEFT JOIN options on options.id = poll_options."optionId"
    WHERE polls.link=$1
    `,
      [link]
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
        polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls."authorID", polls.deleted, polls.active, polls.closed, polls.link,
        poll_options."optionId", 
        options.name as option_name, options.winner, options.ties, options.voters, options.rounds, options.log
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
            *, polls.id as poll_id, polls."dateCreated", polls.name as poll_name, polls.voters as "pollVoters",
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
        SET deleted = true, active = false
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

async function closePoll(pollId) {
  try {
    const {
      rows: [poll],
    } = await client.query(
      `
        UPDATE polls
        SET active = false, closed = true
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

closePoll;

module.exports = {
  getPollById,
  getPollByLink,
  getAllPolls,
  getAllPollsByUserId,
  createPoll,
  deletePoll,
  activatePoll,
  closePoll,
};
