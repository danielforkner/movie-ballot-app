const { getMoviesByOptionId } = require('./movies');

function today() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

async function mapOptions(rows) {
  let map = {};
  for (const row of rows) {
    // id is from polls.id
    if (!map[row.id]) {
      map[row.id] = {
        id: row.poll_id,
        dateCreated: row.dateCreated,
        name: row.poll_name,
        authorID: row.authorID,
        options: [],
      };
    }
    if (row.optionId) {
      let movies = await getMoviesByOptionId(row.optionId);
      let option = {
        id: row.optionId,
        name: row.option_name,
        movies: movies,
      };
      map[row.id].options.push(option);
    }
  }
  return Object.values(map);
}

module.exports = { today, mapOptions };
