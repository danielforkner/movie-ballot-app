// const { PORT } = process.env;
const path = require('path');
const PORT = 3000;
const express = require('express');
const server = express();

server.use(express.static(path.join(__dirname, '..', 'build')));
server.use(express.static('public'));
server.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log('Server is LIVE on port', PORT);
});
