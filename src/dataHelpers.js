export const addMovie = (movie, polls, pollID, optionIdx, setPolls) => {
    polls.data[pollID].options[optionIdx].movies.push(movie);
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


export const removeMovie = () => {
    
}