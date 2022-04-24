const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const apiRouter = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const pollsRouter = require('./polls');
const { getUserByUsername } = require('../db');

apiRouter.use(async (req, res, next) => {
  console.log('Checking for authorization');
  const prefix = `Bearer `;
  const auth = req.header('Authorization');
  if (!auth) {
    console.log('No auth provided. Continuing.');
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { username } = jwt.verify(token, JWT_SECRET);
      if (username) {
        user = await getUserByUsername(username);
        delete user.password;
        req.user = user;
        console.log('Good token. User Set.');
        next();
      } else {
        res.status(409);
        next({ name: 'BadTokenError', message: 'Invalid Token' });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    res.status(409);
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use('/users', usersRouter);

apiRouter.use('/movies', moviesRouter);

apiRouter.use('/polls', pollsRouter);

// error;
apiRouter.use((err, req, res, next) => {
  res.send(err);
});

module.exports = apiRouter;
