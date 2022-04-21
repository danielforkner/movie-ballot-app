const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, getUserByUsername, createUser } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

usersRouter.use('/', (req, res, next) => {
  console.log('A request is being made to /users');
  next();
});

usersRouter.get('/', async (req, res, next) => {
  console.log('A get request for all users was made');
  try {
    const users = await getAllUsers();
    console.log('got the users');
    res.send(users);
  } catch (error) {
    throw error;
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    console.log('USER: ', user);

    //  BCRYPT
    if (user && password === user.password) {
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
        name: 'Bad Login/Password',
        message: 'Login error: you must supply a valid login/password',
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
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(409);
      next({
        name: 'UserAlreadyExistsError',
        message:
          'user already exists, please try again with a different username',
      });
    } else {
      const user = await createUser({
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
      res.send(`Thanks for registering, ${username}!`);
    }
  } catch ({ name, message }) {
    res.status(409);
    next({ name, message });
  }
});

module.exports = usersRouter;
