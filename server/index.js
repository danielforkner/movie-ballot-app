const PORT = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');

server.use(morgan('dev'));

server.use(express.static(path.join(__dirname, '..', 'build')));
server.use(express.static('public'));
server.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

server.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
