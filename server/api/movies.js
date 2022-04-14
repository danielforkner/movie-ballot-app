const axios = require('axios');

const express = require('express');
const moviesRouter = express.Router();

// ombdbapi variables
const KEY = '1ab89983';
const BASE_URL = 'https://www.omdbapi.com/?apikey=';

// FETCH FROM OMDBAPI
const fetchMovies = async (title, year) => {
  try {
    const response = await axios.get(`${BASE_URL}${KEY}&s=${title}&y=${year}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// ROUTES
moviesRouter.get('/:title&:year?', async (req, res, next) => {
  console.log('req.params', req.params);
  const { title, year } = req.params;

  if (title === undefined) {
    res.status(409);
    next({ name: 'bad search', message: 'title must be provided for search' });
  } else {
    try {
      const movies = await fetchMovies(title, year);
      res.send(movies);
    } catch (error) {
      throw error;
    }
  }
});

module.exports = moviesRouter;
