const express = require('express');
const usersRouter = express.Router();
const { Users } = require('../db/models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { requireUser } = require('./utils');

usersRouter.use('/', (req, res, next) => {
  console.log('A request is being made to /users');
  next();
});

usersRouter.get('/', async (req, res, next) => {
  console.log('A get request for all users was made');
  try {
    const users = await Users.getAllUsers();
    console.log('got the users');
    res.send(users);
  } catch (error) {
    throw error;
  }
});

usersRouter.get('/me', requireUser, (req, res, next) => {
  res.send(req.user);
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await Users.getUser(username, password);
    delete user.password;
    console.log('USER: ', user);
    if (user) {
      console.log('LOGIN SUCCESS');
      const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET, {
        expiresIn: '1w',
      });

      res.send({
        message: `Welcome Back, ${user.username}.`,
        token: token,
      });
    } else {
      console.log('LOGIN FAIL');
      res.status(409);
      next({
        name: 'Invalid Credentials',
        message: 'Invalid Username & Password',
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await Users.getUserByUsername(username);

    if (_user) {
      res.status(409);
      next({
        name: 'UserAlreadyExistsError',
        message:
          'user already exists, please try again with a different username',
      });
    } else {
      const user = await Users.createUser({
        username,
        password,
      });
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET,
        { expiresIn: '1w' }
      );
      res.send({ message: `Thanks for registering, ${username}!`, token });
    }
  } catch ({ name, message }) {
    res.status(409);
    next({ name, message });
  }
});

module.exports = usersRouter;
