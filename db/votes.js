const client = require('./client');

async function createVote(rankList, pollId) {
  try {
    const {
      rows: [vote],
    } = await client.query(
      `
            INSERT INTO votes(vote, "pollId")
            VALUES ($1, $2)
            RETURNING *;`,
      [rankList, pollId]
    );
    return vote;
  } catch (error) {
    throw error;
  }
}

async function getVotesByPollId(pollId) {
  try {
    const { rows } = await client.query(
      `
    SELECT vote 
    FROM votes
    WHERE "pollId"=$1; 
    `,
      [pollId]
    );
    const votes = [];
    for (const row of rows) votes.push(row.vote);
    return votes;
  } catch (error) {
    throw error;
  }
}

module.exports = { createVote, getVotesByPollId };
