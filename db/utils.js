const { getMoviesByOptionId } = require('./movies');
const { recordWinner, recordRounds } = require('./options');

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

// START Vote -------------------------------------------------
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
  try {

  } catch (error) {
    await recordVoters(optionId, num_voters)
  }

  // build preferences matrix
  // i is the voterIdx
  for (let i = 0; i < num_voters; i++) {
    if (votes[i][optionId]) {
      for (const movie of votes[i][optionId].movies) {
        castVote(preferences, candidates, i, movie.rank - 1, movie.id);
      }
    }
  }

  console.log('Candidates: ', candidates);
  console.log('Number of candidates: ', num_candidates);
  console.log('Number of voters: ', num_voters);
  console.log('Preferences: ', preferences);

  // tabulate initial votes
  return await tabulate(optionId, preferences, candidates, num_voters);
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

async function tabulate(optionId, preferences, candidates, num_voters, round = 1) {
  let majority = num_voters / 2;

  for (let i = 0; i < num_voters; i++) {
    for (let j = 0; j < candidates.length; j++) {
      let index = preferences[i][j];
      if (candidates[index].elim === false) {
        candidates[index].votes++;
        break;
      }
    }
  }

  let min = find_min(candidates)

  // display / verfify vote counts
  console.log(`Round ${round}`);
  if (round === 5) return;
  for (const candidate of candidates) {
    console.log(`Candidate ${candidate.title} got ${candidate.votes} votes`);
  }

  // check for tie
  if (checkForTie(candidates, min)) {
    let ties = [];
    for (const candidate of candidates) {
      if (!candidate.elim) {
        ties.push(candidate);
      }
    }
    console.log("There is a tie!")
    // Update DB -> voting rounds, current tie, current winner, number of voters
    return ties;
  }

  // check for winner and return if there is one
  for (const candidate of candidates) {
    if (candidate.votes > majority) {
      console.log("Winner!")
      try {
        await recordWinner(optionId, candidate.id)
        await recordRounds(optionId, round);
      } catch (error) {
        throw (error)
      }
      return [candidate];
    }
  }

  // else eliminate the loser and
  // recursive call return tabulate();
  // eliminate(candidates, mininmum);
  eliminate(candidates, min)
  round++
  return await tabulate(optionId, preferences, candidates, num_voters, round);
}

function checkForTie(candidates, min) {
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].votes === min && !candidates[i].elim) {
      continue;
    }
    else {
      return false
    }
  }
  return true;
}

function find_min(candidates) {
  let min = 0;
  let found_first = false;
  for (let i = 0; i < candidates.length; i++) {
    if (!candidates[i].elim) {
      if (!found_first) {
        found_first = true;
        min = candidates[i].votes;
      } else if (candidates[i].votes < min) {
        min = candidates[i].votes;
      }
    }
  }
  console.log("current min: ", min)
  return min;
}

function eliminate(candidates, min) {
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].votes === min) {
      candidates[i].elim = true;
      console.log(`${candidates[i].title} has been eliminated!`)
    }
  }
  // reset votes
  for (let i = 0; i < candidates.length; i++) {
    candidates[i].votes = 0;
  }
}
// END Vote ---------------------------------------------------

module.exports = { today, mapOptions, calculateWinner };
