require('dotenv').config();

const PORT = process.env.PORT || 3000;
const path = require('path');

const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');

server.use(morgan('dev'));

// LOAD REACT APP
server.use(express.static(path.join(__dirname, '..', 'build')));
server.use(express.static('public'));

// SERVER ROUTES
server.use('/api', apiRouter);

// IF NONE OF THE INCOMING ROUTES MATCH A SERVER ROUTE,
// THE SERVER WILL TRANSFER THE ROUTE TO REACT ROUTER
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// START THE SERVER
server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
