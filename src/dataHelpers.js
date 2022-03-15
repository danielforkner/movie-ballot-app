export const addMovie = (movie, polls, pollID, optionIndex, setPolls) => {
    polls.data[pollID].options[optionIndex].movies.push(movie);
    setPolls({
      info: polls.info,
      data: [
        ...polls.data.map((element) => {
          if (+pollID !== element.index) {
            return element;
          } else return polls.data[pollID];
        }),
      ],
    });
}


export const removeMovie = (chosen, movie, polls, pollID, optionIndex, setPolls) => {
    polls.data[pollID].options[optionIndex].movies = chosen.filter((element) => element.imdbID !== movie.imdbID)
          setPolls({
            info: polls.info,
            data: [
              ...polls.data.map((element) => {
                if (+pollID !== element.index) {
                  return element;
    
                } else return polls.data[pollID]
              })
            ]
          })
}