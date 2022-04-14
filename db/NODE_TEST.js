const client = require('./client');
const { getAllPolls, getMoviesByOptionId } = require('./index');

const testDb = async () => {
  console.log('testing get all polls...');
  const polls = await getAllPolls();
  console.log('polls: ', polls);

  console.log('testing getMovies by Option id...');
  const movies = await getMoviesByOptionId(1);
  console.log('movies: ', movies);
};

client
  .connect()
  .then(() => testDb())
  .finally(() => client.end());
