const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');

apiRouter.get('/', (req, res, next) => {
  res.send({ message: 'A request is being made to the api' });
});

apiRouter.use('/users', usersRouter);

// ERROR HANDLER
// apiRouter.use((error, req, res, next) => {

// })

module.exports = apiRouter;
