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

module.exports = {
  createOption,
};
