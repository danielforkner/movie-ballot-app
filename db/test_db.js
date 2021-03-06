const client = require('./client');
const { Polls, Movies, Options, Votes } = require('./models');
const { calculateWinner } = require('./utils');

const testDb = async () => {
  console.log('testing get all polls...');
  const polls = await Polls.getAllPolls();
  console.log('polls: ', polls);

  console.log('testing getMovies by Option id...');
  const movies = await Movies.getMoviesByOptionId(1);
  console.log('movies: ', movies);

  console.log('testing get polls by user id (3)...');
  const authorPolls = await Polls.getAllPollsByUserId(3);
  console.log('authorPolls: ', authorPolls);

  console.log('testing get movie ID by title ("Home Alone")...');
  const id = await Movies.getMovieIdByTitle('Home Alone');
  console.log('movieID: ', id);

  console.log('testing get all votes for poll ID 1...');
  const votes = await Votes.getVotesByPollId(1);
  console.log('votes: ', votes);
  console.log('votes[0][1].movies: ', votes[0][1].movies);

  console.log('testing calculate winner of votes for option ID 1...');
  const result = await calculateWinner(votes, 1);
  console.log('result: ', result);

  console.log('testing get option by id (1)...');
  const option = await Options.getOption(1);
  console.log('result: ', option);
};

client
  .connect()
  .then(() => testDb())
  .finally(() => client.end());
