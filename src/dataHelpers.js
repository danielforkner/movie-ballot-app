export const addMovie = (currentOption, movie, polls, pollID, setPolls) => {
  console.log('curentOption:', currentOption);
  currentOption.movies.push(movie);
  setPolls({
    data: [
      ...polls.data.map((element) => {
        if (+pollID !== element.index) {
          return element;
        } else return polls.data[pollID];
      }),
    ],
  });
};

export const removeMovie = (
  currentOption,
  chosen,
  movie,
  polls,
  pollID,
  setPolls
) => {
  currentOption.movies = chosen.filter(
    (element) => element.imdbID !== movie.imdbID
  );
  setPolls({
    data: [
      ...polls.data.map((element) => {
        if (+pollID !== element.index) {
          return element;
        } else return polls.data[pollID];
      }),
    ],
  });
};
