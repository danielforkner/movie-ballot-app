const client = require('../client');

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

async function recordLog(optionId, log) {
  try {
    const {
      rows: [option],
    } = await client.query(
      `
    UPDATE options
    SET log =$2
    WHERE id=$1;
    `,
      [optionId, log]
    );

    return option;
  } catch (error) {
    throw error;
  }
}

async function getOption(optionId) {
  try {
    const {
      rows: [option],
    } = await client.query(
      `
      SELECT * 
      FROM options
      WHERE id=$1;
      `,
      [optionId]
    );
    return option;
  } catch (error) {
    throw error;
  }
}

async function recordRounds(optionId, rounds) {
  try {
    await client.query(
      `
    UPDATE options
    SET rounds = $2
    WHERE id=$1;
    `,
      [optionId, rounds]
    );
  } catch (error) {
    throw error;
  }
}

async function recordVoters(optionId, voters) {
  try {
    await client.query(
      `
    UPDATE options
    SET voters = $2
    WHERE id=$1;
    `,
      [optionId, voters]
    );
  } catch (error) {
    throw error;
  }
}

async function recordWinner(optionId, winner) {
  try {
    await client.query(
      `
      UPDATE options
      SET winner = $2
      WHERE id=$1;
      `,
      [optionId, winner]
    );
  } catch (error) {
    throw error;
  }
}

async function resetWinner(optionId) {
  try {
    await client.query(
      `
      UPDATE options
      SET winner = null
      WHERE id=$1;
      `,
      [optionId]
    );
  } catch (error) {
    throw error;
  }
}
async function recordTies(optionId, ties) {
  try {
    await client.query(
      `
      UPDATE options
      SET ties = $2
      WHERE id=$1;
      `,
      [optionId, ties]
    );
  } catch (error) {
    throw error;
  }
}

async function resetTies(optionId) {
  try {
    await client.query(
      `
      UPDATE options
      SET ties = null
      WHERE id=$1;
      `,
      [optionId]
    );
  } catch (error) {
    throw error;
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
  resetTies,
  recordTies,
  recordVoters,
  recordWinner,
  resetWinner,
  recordLog,
  deleteOption,
};
