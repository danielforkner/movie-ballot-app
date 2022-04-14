const express = require('express');
const pollsRouter = express.Router();
const { getAllPolls } = require('../../db');

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

module.exports = pollsRouter;
