const axios = require('axios');

// database variables
const DB_URL = 'http://localhost:4000';

// FETCH FROM OUR DATABASE
const loginUser = async (username, password) => {
  console.log(username, password);
  try {
    const { data } = await axios.post(`${DB_URL}/api/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

const registerUser = async (username, password) => {
  try {
    const { data } = await axios.post(`${DB_URL}/api/users/register`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

const getMe = async (token) => {
  try {
    const { data } = await axios.get(`${DB_URL}/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

const fetchMyPolls = async (token) => {
  try {
    const { data } = await axios.get(`${DB_URL}/api/polls/myPolls`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchMovies = async (title, year) => {
  try {
    const response = await axios.get(`${DB_URL}/api/movies/${title}&${year}`);
    console.log('fetchMovies response ln 18 fetch.js', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addMovieToOption = async (token, title, year, optionId) => {
  try {
    const { data } = await axios.patch(
      `${DB_URL}/api/polls/options/addMovie`,
      { title, year, optionId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const removeMovieFromOption = async (token, title, optionId) => {
  try {
    const { data } = await axios.delete(
      `${DB_URL}/api/polls/options/removeMovie`,
      {
        data: {
          title,
          optionId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  removeMovieFromOption,
  addMovieToOption,
  fetchMovies,
  fetchMyPolls,
  getMe,
  registerUser,
  loginUser,
};
