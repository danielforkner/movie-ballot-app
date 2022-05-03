const client = require('./client');
const {
  getAllPolls,
  getMoviesByOptionId,
  getAllPollsByUserId,
  getMovieIdByTitle,
  getVotesByPollId,
} = require('./index');
const { calculateWinner } = require('./utils');

const testDb = async () => {
  console.log('testing get all polls...');
  const polls = await getAllPolls();
  console.log('polls: ', polls);

  console.log('testing getMovies by Option id...');
  const movies = await getMoviesByOptionId(1);
  console.log('movies: ', movies);

  console.log('testing get polls by user id (3)...');
  const authorPolls = await getAllPollsByUserId(3);
  console.log('authorPolls: ', authorPolls);

  console.log('testing get movie ID by title ("Home Alone")...');
  const id = await getMovieIdByTitle('Home Alone');
  console.log('movieID: ', id);

  console.log('testing get all votes for poll ID 1...');
  const votes = await getVotesByPollId(1);
  console.log('votes: ', votes);

  console.log('testing calculate winner of votes for option ID 1...');
  const winner = await calculateWinner(votes, 1);
  // console.log('winner: ', winner);
};

client
  .connect()
  .then(() => testDb())
  .finally(() => client.end());
