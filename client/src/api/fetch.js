import axios from 'axios';

// database variables
const DB_URL = 'http://localhost:4000';

// FETCH FROM OUR DATABASE
export const loginUser = async (username, password) => {
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

export const registerUser = async (username, password) => {
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

export const getMe = async (token) => {
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

export const fetchMyPolls = async (token) => {
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

export const fetchMovies = async (title, year) => {
  try {
    const response = await axios.get(`${DB_URL}/movies/${title}&${year}`);
    console.log('fetchMovies response ln 18 fetch.js', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
