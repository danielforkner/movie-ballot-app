const express = require('express');
const { createUser, getUserByUsername } = require('../../db');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'User Exists Erro',
        message: 'Username is taken, try again',
      });
    }

    const user = await createUser({
      username,
      password,
    });

    console.log(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
