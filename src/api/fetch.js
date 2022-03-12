const KEY = '1ab89983';
const BASE_URL = 'https://www.omdbapi.com/?apikey=';

export const fetchMovies = async (title, year) => {
  try {
    const response = await fetch(`${BASE_URL}${KEY}&s=${title}&y=${year}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
