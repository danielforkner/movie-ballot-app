require('dotenv').config();
const { client } = require('../db');
client.connect(); // WHERE DO I client.end() ??

const PORT = process.env.PORT || 1337;
const path = require('path');

const express = require('express');
const server = express();

const morgan = require('morgan');

server.use(morgan('dev'));
server.use(express.urlencoded());
server.use(express.json());

// LOAD REACT APP
server.use(express.static(path.join(__dirname, '..', 'build')));
server.use(express.static('public'));

// SERVER ROUTES
const apiRouter = require('./api');
server.use((req, res, next) => {
  console.log('<____Body Logger START____>');
  console.log(req.body);
  console.log('<_____Body Logger END_____>');

  next();
});
server.use('/api', apiRouter);

// IF NONE OF THE INCOMING ROUTES MATCH A SERVER ROUTE,
// THE SERVER WILL TRANSFER THE ROUTE TO REACT ROUTER
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// ERROR;
server.use((err, req, res, next) => {
  if (err.message) {
    res.send(err.message);
  } else {
    res.send(err);
  }
});

// START THE SERVER
server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
