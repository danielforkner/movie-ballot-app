require('dotenv').config();
const express = require('express');
const server = express();

// logs
const morgan = require('morgan');
server.use(morgan('dev'));

// load react app
const path = require('path');
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, './client', 'build')));

// handle application/json requests
server.use(express.json());
server.use((req, res, next) => {
  console.log('<____Body Logger START____>');
  console.log(req.body);
  console.log('<_____Body Logger END_____>');

  next();
});

// SERVER ROUTES
const apiRouter = require('./api');
server.use('/api', apiRouter);

// IF NONE OF THE INCOMING ROUTES MATCH A SERVER ROUTE,
// THE SERVER WILL TRANSFER THE ROUTE TO REACT ROUTER
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// ERROR;
server.use((err, req, res, next) => {
  if (err.message) {
    res.send(err.message);
  } else {
    res.send(err);
  }
});

// bring in DB connection
const { client } = require('./db');
client.connect();

// connect to server
const PORT = process.env.PORT || 3000;

// START THE SERVER
server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
