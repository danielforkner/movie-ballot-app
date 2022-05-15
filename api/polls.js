const pollsRouter = require('express').Router();
const {
  Polls,
  Options,
  Movies,
  Votes,
  Option_Movies,
} = require('../db/models');

const { requireUser } = require('./utils');

pollsRouter.use('/', (req, res, next) => {
  console.log('A request to /polls is being made');
  next();
});

pollsRouter.get('/poll/:pollId', async (req, res, next) => {
  console.log('retrieving specific poll');
  const { pollId } = req.params;
  try {
    const poll = await Polls.getPollById(pollId);
    console.log('got the poll: ', poll);
    if (poll.length === 0) {
      res.status(404);
      next({
        name: 'NoPageExists',
        message: 'The page you requested does not exist',
      });
    } else {
      res.send(poll);
    }
  } catch (error) {
    throw error;
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
  const { title, year, optionId } = req.body;
  try {
    const inserted = await Movies.createMovie(title, year, optionId);
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

module.exports = pollsRouter;
