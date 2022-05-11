const client = require('./client');

async function createOption({ name, poll }) {
  try {
    const {
      rows: [option],
    } = await client.query(
      `
      INSERT INTO options(name)
      VALUES ($1)
      RETURNING *;`,
      [name]
    );

    await client.query(
      `
      INSERT INTO poll_options("pollId", "optionId")
      VALUES ($1, $2);
      `,
      [poll, option.id]
    );
    return option;
  } catch (error) {
    throw error;
  }
}

async function getOption(optionId) {
  try {
    const { rows: [option] } = await client.query(
      `
      SELECT * 
      FROM options
      WHERE id=$1;
      `, [optionId]
    )
    return option;
  } catch (error) {
    throw error;
  }
}

async function recordRounds(optionId, rounds) {
  try {
    await client.query(`
    UPDATE options
    SET rounds = $2
    WHERE id=$1;
    `, [optionId, rounds])
  } catch (error) {
    throw error;
  }
}

async function recordWinner(optionId, movieId) {
  try {
    await client.query(
      `
      UPDATE options
      SET winner = $2
      WHERE id=$1;
      `, [optionId, movieId]
    )
  } catch (error) {
    throw error
  }
}

async function resetWinner(optionId) {
  try {
    await client.query(
      `
      UPDATE options
      SET winner = null
      WHERE id=$1;
      `, [optionId]
    )
  } catch (error) {
    throw error
  }
}

async function deleteOption(optionId) {
  try {
    await client.query(
      `
      DELETE FROM option_movies
      WHERE "optionId"=$1;`,
      [optionId]
    );

    await client.query(
      `
      DELETE FROM poll_options
      WHERE "optionId"=$1;`,
      [optionId]
    );

    const {
      rows: [option],
    } = await client.query(
      `
      DELETE FROM options
      WHERE options.id=$1
      RETURNING *;`,
      [optionId]
    );

    return option;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOption,
  getOption,
  recordRounds,
  recordWinner,
  deleteOption,
};
