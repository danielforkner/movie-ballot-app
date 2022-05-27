const pollsRouter = require('express').Router();
const {
  Polls,
  Options,
  Movies,
  Votes,
  Option_Movies,
} = require('../db/models');
const { calculateWinner } = require('../db/utils');

const { requireUser } = require('./utils');

pollsRouter.get('/poll/:pollLink', async (req, res, next) => {
  console.log('retrieving specific poll');
  const { pollLink } = req.params;
  try {
    const poll = await Polls.getPollByLink(pollLink);
    res.send(poll);
  } catch (error) {
    throw error;
  }
});

pollsRouter.get('/link/:pollLink', async (req, res, next) => {
  console.log('retrieving specific poll');
  const { pollLink } = req.params;
  try {
    const poll = await Polls.getPollByLink(pollLink);
    res.send(poll);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

pollsRouter.get('/allPolls', async (req, res, next) => {
  console.log('A get request for all polls was made');
  try {
    const polls = await Polls.getAllPolls();
    console.log('got the polls');
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.post('/newPoll', requireUser, async (req, res, next) => {
  console.log('A new poll is being made');
  const { pollName } = req.body;
  try {
    const poll = await Polls.createPoll({
      name: pollName,
      authorID: req.user.id,
    });
    console.log('poll created: ', poll);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.delete('/deletePoll', requireUser, async (req, res, next) => {
  console.log('A poll is being deleted');
  const { pollId } = req.body;
  try {
    const poll = await Polls.deletePoll(pollId);
    console.log('poll deleted: ', poll);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.delete('/deleteOption', requireUser, async (req, res, next) => {
  console.log('An option is being deleted');
  const { optionId } = req.body;
  try {
    const option = await Options.deleteOption(optionId);
    console.log('option deleted: ', option);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.post('/newOption', requireUser, async (req, res, next) => {
  console.log('A new poll is being made');
  const { optionName, pollId } = req.body;
  try {
    const option = await Options.createOption({
      name: optionName,
      poll: pollId,
    });
    console.log('option created: ', option);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.get('/myPolls', requireUser, async (req, res, next) => {
  try {
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.patch('/options/addMovie', requireUser, async (req, res, next) => {
  console.log('trying to add a movie to option...');
  const { title, year, optionId, imdbID, poster } = req.body;
  try {
    const inserted = await Movies.createMovie(
      title,
      year,
      imdbID,
      poster,
      optionId
    );
    console.log('inserted', inserted);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.patch('/activate', requireUser, async (req, res, next) => {
  console.log('trying to activate a poll...');
  const { pollId } = req.body;
  try {
    const activated = await Polls.activatePoll(pollId);
    console.log('activated: ', activated);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.patch('/close', requireUser, async (req, res, next) => {
  console.log('trying to close a poll...');
  const { pollId } = req.body;
  try {
    const closed = await Polls.closePoll(pollId);
    console.log('closed: ', closed);
    const polls = await Polls.getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.delete(
  '/options/removeMovie',
  requireUser,
  async (req, res, next) => {
    console.log('trying to delete a movie from option...');
    const { title, optionId } = req.body;
    try {
      const deleted = await Option_Movies.removeMovieFromOption(
        title,
        optionId
      );
      console.log('deleted: ', deleted);
      const polls = await Polls.getAllPollsByUserId(req.user.id);
      res.send(polls);
    } catch (error) {
      throw error;
    }
  }
);

pollsRouter.post('/castVote', async (req, res, next) => {
  console.log('attempting to cast a vote...');
  const { rankList, pollId } = req.body;
  try {
    const vote = await Votes.createVote(rankList, pollId);
    console.log('Voted: ', vote);
    res.send(vote);
  } catch (error) {
    throw error;
  }
});

pollsRouter.get(
  '/calculateVotes/:pollId',
  requireUser,
  async (req, res, next) => {
    const { pollId } = req.params;
    console.log('calculating votes...');
    try {
      const votes = await Votes.getVotesByPollId(pollId);
      if (votes.length === 0) {
        res.status(400);
        next({
          name: 'No votes error',
          message: 'There have been no votes placed for this poll yet',
        });
      } else {
        const options = Object.keys(votes[0]);
        console.log('options: ', options);
        for (const option of options) {
          await calculateWinner(votes, option);
        }
      }
      res.send('votes updated');
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = pollsRouter;
