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
  // i is the voterIdx
  for (let i = 0; i < num_voters; i++) {
    if (votes[i][optionId]) {
      for (const movie of votes[i][optionId].movies) {
        castVote(preferences, candidates, i, movie.rank - 1, movie.id);
      }
    }
  }

  // tabulate initial votes
  tabulate(preferences, candidates, num_voters);

  console.log('Candidates: ', candidates);
  console.log('Number of candidates: ', num_candidates);
  console.log('Number of voters: ', num_voters);
  console.log('Majority: ', majority);
  console.log('Preferences: ', preferences);
}

// record preference for each vote one at a time
function castVote(preferences, candidates, voterIdx, rank, movieId) {
  // get index of candidate
  let candidateIdx;
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].id === movieId) {
      candidateIdx = i;
      break;
    }
  }
  if (!preferences[voterIdx]) preferences.push([]);
  preferences[voterIdx][rank] = candidateIdx;
}

function tabulate(preferences, candidates, num_voters, round = 0) {
  for (let i = 0; i < num_voters; i++) {
    for (let j = 0; j < candidates.length; j++) {
      let index = preferences[i][j];
      if (candidates[index].elim === false) {
        candidates[index].votes++;
        break;
      }
    }
  }

  // verfify vote counts
  console.log(`Round ${round}`);
  for (const candidate of candidates) {
    console.log(`Candidate ${candidate.title} got ${candidate.votes} votes`);
  }

  // check for tie

  // check for  !winner

  // eliminate the loser and
  // recursive call tabulate();

  // else return
}

module.exports = { today, mapOptions, calculateWinner };
