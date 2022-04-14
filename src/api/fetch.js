import axios from 'axios';

// database variables
const DB_URL = '/api';

// FETCH FROM OUR DATABASE
export const registerUser = async (usr, pwd) => {
  const response = await axios.post(`${DB_URL}/users/register`, {
    username: usr,
    password: pwd,
  });
  console.log('registerUser response from src/api/fetch.js:', response);
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
