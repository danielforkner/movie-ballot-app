const express = require('express');
const { getAllUsers } = require('../../db');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
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

usersRouter.post('/register', async (req, res, next) => {
  console.log('an attempt to register is being made...');
  console.log(req.body);
  res.send({ message: 'this does not stop the api call' });
  // const { username, password } = req.body;

  // try {
  //   const _user = await getUserByUsername(username);

  //   if (_user) {
  //     next({
  //       name: 'User Exists Error',
  //       message: 'Username is taken, try again',
  //     });
  //   }

  //   const user = await createUser({
  //     username,
  //     password,
  //   });

  //   console.log(user);
  // } catch ({ name, message }) {
  //   next({ name, message });
  // }
});

module.exports = usersRouter;
