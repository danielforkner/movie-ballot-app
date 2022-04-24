const express = require('express');
const pollsRouter = express.Router();
const {
  getAllPolls,
  getAllPollsByUserId,
  removeMovieFromOption,
  createMovie,
  createPoll,
  createOption,
} = require('../db');
const { requireUser } = require('./utils');

pollsRouter.use('/', (req, res, next) => {
  console.log('A request to /polls is being made');
  next();
});

pollsRouter.get('/allPolls', async (req, res, next) => {
  console.log('A get request for all polls was made');
  try {
    const polls = await getAllPolls();
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
    const poll = await createPoll({ name: pollName, authorID: req.user.id });
    console.log('poll created: ', poll);
    const polls = await getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.post('/newOption', requireUser, async (req, res, next) => {
  console.log('A new poll is being made');
  const { optionName, pollId } = req.body;
  try {
    const option = await createOption({ name: optionName, poll: pollId });
    console.log('option created: ', option);
    const polls = await getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.get('/myPolls', requireUser, async (req, res, next) => {
  try {
    const polls = await getAllPollsByUserId(req.user.id);
    res.send(polls);
  } catch (error) {
    throw error;
  }
});

pollsRouter.patch('/options/addMovie', requireUser, async (req, res, next) => {
  console.log('trying to add a movie to option...');
  const { title, year, optionId } = req.body;
  try {
    const inserted = await createMovie(title, year, optionId);
    console.log('inserted', inserted);
    const polls = await getAllPollsByUserId(req.user.id);
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
      const deleted = await removeMovieFromOption(title, optionId);
      console.log('deleted: ', deleted);
      const polls = await getAllPollsByUserId(req.user.id);
      res.send(polls);
    } catch (error) {
      throw error;
    }
  }
);

module.exports = pollsRouter;
