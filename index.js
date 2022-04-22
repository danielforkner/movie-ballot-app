require('dotenv').config();
const express = require('express');
const server = express();

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
server.use(cors());

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

// server routes
const apiRouter = require('./api');
server.use('/api', apiRouter);

// fallback to react server if no server routes match
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// bring in DB connection
const { client } = require('./db');
client.connect();

// connect to server
const PORT = process.env.PORT || 4000;

// START THE SERVER
server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
