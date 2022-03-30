const express = require('express');
const { createUser, getUserByUsername } = require('../../db');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');
  console.log(req.body);
  next();
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
