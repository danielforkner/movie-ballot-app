const express = require('express');
const { getAllUsers, getUserByUsername, createUser } = require('../../db');
const usersRouter = express.Router();

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

usersRouter.post('/register', async (req, res, next) => {
  console.log('an attempt to register is being made...');
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        message:
          'user already exists, please try again with a different username',
      });
    }

    const user = await createUser({
      username,
      password,
    });

    console.log('THIS IS USER:', user);

    res.sendStatus(201);
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
