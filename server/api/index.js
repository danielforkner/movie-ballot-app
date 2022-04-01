const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');

apiRouter.get('/', (req, res, next) => {
  console.log('A request is being made to the api');
});

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
