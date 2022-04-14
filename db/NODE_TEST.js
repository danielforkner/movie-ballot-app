const client = require('./client');
const { getAllPolls } = require('./polls');

const testGetAllPolls = async () => {
  console.log('testing get all polls...');
  const polls = await getAllPolls();
  console.log(polls);
};

client
  .connect()
  .then(() => testGetAllPolls())
  .finally(() => client.end());
