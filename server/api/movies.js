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
moviesRouter.get('/', async (req, res, next) => {
  const { title, year } = req.body;

  if (title === undefined) {
    res.status(401);
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
