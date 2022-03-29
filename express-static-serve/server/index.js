const express = require('express');
const server = express(); // create express app

server.get('/', (req, res) => {
  res.send('This is from express.js');
});

// start express server on port 5000
server.listen(5000, () => {
  console.log('server started on port 5000');
});
