import axios from 'axios';

// ombdbapi variables
const KEY = '1ab89983';
const BASE_URL = 'https://www.omdbapi.com/?apikey=';

// database variables
const DB_URL = '/api';

// FETCH FROM OMDBAPI
export const fetchMovies = async (title, year) => {
  try {
    const response = await fetch(`${BASE_URL}${KEY}&s=${title}&y=${year}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// FETCH FROM OUR DATABASE
export const registerUser = async (usr, pwd) => {
  const response = await axios.post(`${DB_URL}/users/register`, {
    username: usr,
    password: pwd,
  });
  console.log('registerUser response from src/api/fetch.js:', response);
};
