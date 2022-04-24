const client = require('./client');
const {
  getAllPolls,
  getMoviesByOptionId,
  getAllPollsByUserId,
  getMovieIdByTitle,
} = require('./index');

const testDb = async () => {
  console.log('testing get all polls...');
  const polls = await getAllPolls();
  console.log('polls: ', polls);

  console.log('testing getMovies by Option id...');
  const movies = await getMoviesByOptionId(1);
  console.log('movies: ', movies);

  console.log('testing get polls by user id (1)...');
  const authorPolls = await getAllPollsByUserId(1);
  console.log('authorPolls: ', authorPolls);

  console.log('testing get movie ID by title ("Home Alone")...');
  const id = await getMovieIdByTitle('Home Alone');
  console.log('movieID: ', id);
};

client
  .connect()
  .then(() => testDb())
  .finally(() => client.end());
