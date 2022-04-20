const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const pollsRouter = require('./polls');

apiRouter.get('/', (req, res, next) => {
  console.log('A request is being made to the api');
});

apiRouter.use('/users', usersRouter);

apiRouter.use('/movies', moviesRouter);

apiRouter.use('/polls', pollsRouter);

// error;
apiRouter.use((err, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
