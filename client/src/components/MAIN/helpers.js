export const createRankList = (options) => {
  const map = {};
  options.forEach((option, i) => {
    if (!map[option.id]) {
      map[option.id] = {
        name: option.name,
        movies: [],
      };
    }
    if (option.movies && option.movies.length > 0) {
      option.movies.forEach((movie, i) => {
        map[option.id].movies.push(movie);
      });
    }
  });
  return map;
};

export const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
};
