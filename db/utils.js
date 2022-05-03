const { getMoviesByOptionId } = require('./movies');

function today() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

async function mapOptions(rows) {
  let map = {};
  for (const row of rows) {
    // id is from polls.id
    if (!map[row.poll_id]) {
      map[row.poll_id] = {
        id: row.poll_id,
        dateCreated: row.dateCreated,
        name: row.poll_name,
        authorID: row.authorID,
        deleted: row.deleted,
        active: row.active,
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
      map[row.poll_id].options.push(option);
    }
  }
  return Object.values(map);
}

// https://cs50.harvard.edu/x/2022/psets/3/runoff/
async function calculateWinner(votes, optionId) {
  let candidates;
  let preferences = [];
  try {
    candidates = await getMoviesByOptionId(optionId);
    for (const candidate of candidates) {
      candidate.votes = 0;
      candidate.elim = false;
    }
  } catch (error) {
    throw error;
  }
  let num_candidates = candidates.length;
  let num_voters = votes.length;
  let majority = votes.length / 2;

  // build preferences matrix
  for (let i = 0; i < num_voters; i++) {
    preferences.push([]);
    for (let j = 0; j < num_candidates; j++) {
      preferences[i];
    }
  }

  console.log('Candidates: ', candidates);
  console.log('Number of candidates: ', num_candidates);
  console.log('Number of voters: ', num_voters);
  console.log('Majority: ', majority);
}

function tabulate() {}

module.exports = { today, mapOptions, calculateWinner };
